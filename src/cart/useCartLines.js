import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import { loadCartLines, removeItem, updateItemQty } from './cartService'

const lineKey = (item) => item.lineId ?? item.productId

export function useCartLines() {
  const { t, i18n } = useTranslation()
  const { user, loading: authLoading } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadFailed, setLoadFailed] = useState(false)
  const [updateFailed, setUpdateFailed] = useState(false)
  const [pendingKeys, setPendingKeys] = useState(() => new Set())
  const [version, setVersion] = useState(0)

  useEffect(() => {
    if (authLoading) return
    let cancelled = false
    loadCartLines(user)
      .then((lines) => {
        if (cancelled) return
        setItems(lines)
        setLoadFailed(false)
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [user, authLoading, i18n.language, version])

  const runChange = async (keys, change) => {
    if (keys.some((key) => pendingKeys.has(key))) return
    setUpdateFailed(false)
    setPendingKeys((current) => new Set([...current, ...keys]))
    try {
      await change()
    } catch (err) {
      console.error(err)
      setUpdateFailed(true)
    } finally {
      setPendingKeys((current) => {
        const next = new Set(current)
        keys.forEach((key) => next.delete(key))
        return next
      })
      setVersion((current) => current + 1)
    }
  }

  const setQty = (item, quantity) => runChange([lineKey(item)], () => updateItemQty(user, item, quantity))

  const stepQty = (item, delta) => setQty(item, Math.max(1, item.quantity + delta))

  const removeLine = (item) => runChange([lineKey(item)], () => removeItem(user, item))

  const removeAll = () =>
    runChange(items.map(lineKey), () => Promise.all(items.map((item) => removeItem(user, item))))

  let error = ''
  if (updateFailed) error = t('cartPage.updateError')
  else if (loadFailed) error = t('cartPage.loadError')

  return {
    items,
    loading,
    error,
    subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    lineKey,
    isPending: (item) => pendingKeys.has(lineKey(item)),
    setQty,
    stepQty,
    removeLine,
    removeAll,
  }
}
