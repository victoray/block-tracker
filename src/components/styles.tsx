import styled from 'styled-components/macro'
import { Card, Table } from 'antd'

export const StyledTable = styled(Table)`
  border: 1px solid #303030;
  .ant-table-container {
    border-radius: 16px;
  }

  table {
    border-style: hidden !important;
    border-radius: 16px;
  }

  .ant-table-container table > thead > tr:first-child th:first-child {
    border-top-left-radius: 16px;
  }

  .ant-table {
    border-radius: 16px;
    background-color: transparent;
  }

  .ant-table-thead > tr > th {
    background-color: transparent;
  }

  .ant-table-tbody > tr > td {
    background-color: transparent;
    border-bottom: none;
  }
`

export const StyledCard = styled(Card)`
  border-radius: 16px;
  .ant-card-body {
    display: flex;
    align-items: center;
  }
`
