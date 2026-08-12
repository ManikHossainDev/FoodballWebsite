"use client"
import { useState } from "react"
import { Table, Tag, Modal, Descriptions, Image, Button } from "antd"
import { EyeOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import { useGetPayoutHistoryQuery } from "@/redux/features/Profile/Profile"

interface Payment {
  _id: string
  amount: number
  transaction: string
  status: string
  type: string
  createdAt: string
  invoice?: string
}

const statusColor: Record<string, string> = {
  success: "green",
  pending: "gold",
  cancelled: "red",
}

const Page = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const handleViewDetails = (record: Payment) => {
    setSelectedPayment(record)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPayment(null)
  }

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
    {
  title: "Action",
  key: "action",
  fixed: "right",
  width: 90,
  render: (_, record) => (
    record.status === "success" && record.type === "withdraw" ? (
      <Button
        type="text"
        icon={<EyeOutlined style={{ color: "#ffffff" }} />}
        onClick={() => handleViewDetails(record)}
      />
    ) : null
  ),
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

      <Modal
        title="Payment Details"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        className="dark-payout-modal"
      >
        {selectedPayment && (
          <>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="Amount">
                ${selectedPayment.amount}
              </Descriptions.Item>
              <Descriptions.Item label="Type">
                <Tag color={selectedPayment.type === "credit" ? "blue" : "purple"}>
                  {selectedPayment.type.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={statusColor[selectedPayment.status] ?? "default"}>
                  {selectedPayment.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Date">
                {new Date(selectedPayment.createdAt).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>

            {selectedPayment.invoice && (
              <div className="mt-3">
                <p className="mb-2" style={{ color: "#ffffff" }}>
                  Invoice
                </p>
                <Image
                  src={selectedPayment.invoice}
                  alt="Invoice"
                  style={{ maxWidth: "100%", borderRadius: 8 }}
                />
              </div>
            )}
          </>
        )}
      </Modal>

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
        .dark-payout-modal .ant-modal-content {
          background-color: #1a1a1a;
        }
        .dark-payout-modal .ant-modal-header {
          background-color: #1a1a1a;
        
        }
        .dark-payout-modal .ant-modal-title {
          color: #ffffff;
        }
        .dark-payout-modal .ant-modal-close {
          color: #ffffff;
        }
        .dark-payout-modal .ant-descriptions-item-label {
          // background-color: #333333 !important;
          color: #ffffff !important;
        }
        .dark-payout-modal .ant-descriptions-item-content {
          background-color: #1a1a1a !important;
          color: #ffffff !important;
        }
        .dark-payout-modal .ant-descriptions-view {
          border-color: #333333 !important;
        }
        .dark-payout-modal .ant-descriptions-row > th,
        .dark-payout-modal .ant-descriptions-row > td {
          border-color: #333333 !important;
        }
      `}</style>
    </div>
  )
}

export default Page