/* eslint-disable @typescript-eslint/no-explicit-any */
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { ChangeEvent, useEffect, useState } from 'react'

import { api } from '@lib/axios'

import { Transaction } from '@/utils/description'

export interface Options {
  value: string
  label: string
}

interface Output {
  open: boolean
  showTransaction: (item: any) => void
  setOpen: (open: boolean) => void
  exportUrl: string
  loading: boolean
  currentPage: number
  setCurrent: (transaction: Transaction) => void
  datePickerOpen: boolean
  sortOptions: string[]
  handleTypeChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleCategoryChange: (event: ChangeEvent<HTMLInputElement>) => void
  handlePrevious: () => void
  handleNext: () => void
  items: Transaction[]
  classNames(...classes: string[]): string
  handleDownload: () => void
  setExportType: (option: string) => void
  setDatePickerOpen: (open: boolean) => void
  setEndDate: (day: string) => void
  setStartDate: (day: string) => void
  current: Transaction
}

export function useReceipt(): Output {
  const [loading, setLoading] = useState(true)

  const [open, setOpen] = useState(false)
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  const [items, setItems] = useState<Transaction[]>([])

  const [currentPage, setCurrentPage] = useState(1)

  const [current, setCurrent] = useState<Transaction>({} as Transaction)

  const [exportUrl] = useState('')

  const sortOptions: string[] = ['PDF', 'Excel', 'CSV']

  function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ')
  }

  async function showTransaction(item: any) {
    if (item.type === 'credit') {
      return
    }

    setOpen(true)

    try {
      setCurrent(item)
    } catch (err) {
      //
    }
  }

  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  function handleNext() {
    setCurrentPage(currentPage + 1)
  }

  function handleDownload() {
    const comprovante = document.getElementById('comprovante') as HTMLElement

    html2canvas(comprovante).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0)

      // eslint-disable-next-line new-cap
      const pdf = new jsPDF({
        orientation: 'landscape',
      })

      const width = pdf.internal.pageSize.getWidth()
      const height = pdf.internal.pageSize.getHeight()

      const widthRatio = width / canvas.width
      const heightRatio = height / canvas.height

      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio

      const marginX = (canvas.width * ratio) / 2

      pdf.addImage(
        imgData,
        'PNG',
        marginX + 15,
        5,
        canvas.width * ratio,
        canvas.height * ratio,
      )
      pdf.save('comprovante.pdf')
    })
  }

  const [selectedTypeFilters, setSelectedTypeFilters] = useState('')

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = (event.target as HTMLInputElement).value
    setSelectedTypeFilters(currentValue)
  }

  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState('')

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = (event.target as HTMLInputElement).value
    setSelectedCategoryFilters(currentValue)
  }

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [exportType, setExportType] = useState('')

  useEffect(() => {
    setLoading(true)

    const params = new URLSearchParams()
    params.append('page', String(currentPage))
    if (selectedTypeFilters) params.append('type', selectedTypeFilters)
    if (selectedCategoryFilters) {
      params.append('category', selectedCategoryFilters.toUpperCase())
    }
    if (startDate) params.append('start_date', startDate)
    if (endDate) params.append('end_date', endDate)
    if (exportType) {
      params.append('should_export', 'true')
      params.append(
        'export_type',
        exportType === 'Excel' ? 'xlsx' : exportType.toLowerCase(),
      )
    }

    const queryString = params.toString()
    api.get('/transactions/v2?' + queryString).then(({ data }) => {
      setItems(data.transactions)
      setLoading(false)
      if (exportType) {
        window.open(data.url, '_blank')
      }
    })
  }, [
    endDate,
    startDate,
    currentPage,
    selectedTypeFilters,
    selectedCategoryFilters,
    exportType,
  ])

  return {
    open,
    showTransaction,
    items,
    exportUrl,
    current,
    setOpen,
    setExportType,
    setCurrent,
    loading,
    datePickerOpen,
    sortOptions,
    classNames,
    handleTypeChange,
    handleCategoryChange,
    handlePrevious,
    handleNext,
    currentPage,
    handleDownload,
    setDatePickerOpen,
    setEndDate,
    setStartDate,
  }
}
