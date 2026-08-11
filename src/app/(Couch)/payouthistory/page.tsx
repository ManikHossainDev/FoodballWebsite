"use client"
import { useState } from "react"
import { Table, Tag,  } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useGetPayoutHistoryQuery } from "@/redux/features/Profile/Profile"

interface Payment {
  _id: string
  amount: number
  transaction: string
  status: string
  type: string
  createdAt: string
}

const statusColor: Record<string, string> = {
  success: "green",
  pending: "gold",
  cancelled: "red",
}

const Page = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, isLoading } = useGetPayoutHistoryQuery({ page, limit })

  const payoutHistory = data as {
    data?: {
      data: Payment[]
      pagination?: {
        page: number
        limit: number
        total: number
      }
    }
  } | undefined

  const payments = payoutHistory?.data?.data ?? []
  const pagination = payoutHistory?.data?.pagination

  const columns: ColumnsType<Payment> = [
    {
      title: "Transaction",
      dataIndex: "transaction",
      key: "transaction",
      ellipsis: true,
      render: (transaction: string) =>
        transaction ? transaction.slice(-10) : "-",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount}`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag color={type === "credit" ? "blue" : "purple"}>{type.toUpperCase()}</Tag>
      ),
      filters: [
        { text: "Credit", value: "credit" },
        { text: "Withdraw", value: "withdraw" },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={statusColor[status] ?? "default"}>{status.toUpperCase()}</Tag>
      ),
      filters: [
        { text: "Success", value: "success" },
        { text: "Pending", value: "pending" },
        { text: "Cancelled", value: "cancelled" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleString(),
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
  ]

  return (
    <div className="mt-3">
      <Table<Payment>
        className="dark-payout-table"
        rowKey="_id"
        columns={columns}
        dataSource={payments}
        loading={isLoading}
        pagination={{
          current: pagination?.page ?? page,
          pageSize: pagination?.limit ?? limit,
          pageSizeOptions: ["10", "20", "50"],
          onChange: (newPage, newPageSize) => {
            setPage(newPage)
            setLimit(newPageSize)
          },
        }}
        scroll={{ x: true }}
      />

      <style jsx global>{`
       
        .dark-payout-table .ant-table-thead > tr > th {
          background-color: #333333;
          color: #ffffff;
          border-bottom: 1px solid #333333;
        }
        .dark-payout-table .ant-table-tbody > tr > td {
          background-color: #1a1a1a;
          color: #ffffff;
          border-bottom: 1px solid #222222;
        }
        .dark-payout-table .ant-table-tbody > tr:hover > td {
          background-color: #1a1a1a !important;
        }
        .dark-payout-table .ant-table-thead th.ant-table-column-has-sorters:hover {
          background-color: #1a1a1a;
        }
        .dark-payout-table .ant-table-column-sorter,
        .dark-payout-table .ant-table-filter-trigger {
          color: #ffffff;
        }
        .dark-payout-table .ant-pagination-item,
        .dark-payout-table .ant-pagination-item a {
          background-color: #000000;
          color: #ffffff;
          border-color: #333333;
        }
      
        .dark-payout-table .ant-select-selector {
          background-color: #1a1a1a !important;
          color: #ffffff !important;
          border-color: #333333 !important;
        }
        .dark-payout-table .ant-pagination-prev button,
        .dark-payout-table .ant-pagination-next button {
          background-color: #333333;
          color: #ffffff;
          border-color: #333333;
        }
        .dark-payout-table .ant-pagination-prev .ant-pagination-item-link,
        .dark-payout-table .ant-pagination-next .ant-pagination-item-link {
          color: #ffffff !important;
        }
        .dark-payout-table .ant-pagination-prev .anticon,
        .dark-payout-table .ant-pagination-next .anticon,
        .dark-payout-table .ant-pagination-prev svg,
        .dark-payout-table .ant-pagination-next svg {
          color: #ffffff !important;
          fill: #ffffff !important;
        }
        .dark-payout-table .ant-pagination-disabled .ant-pagination-item-link,
        .dark-payout-table .ant-pagination-disabled .anticon,
        .dark-payout-table .ant-pagination-disabled svg {
          color: #666666 !important;
          fill: #666666 !important;
        }
      `}</style>
    </div>
  )
}

export default Page