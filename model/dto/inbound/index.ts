import { InboundDAO } from "../../dao/inbound"
import { DorayakiDAO } from "../../dao/dorayaki"
import { InboundStatus } from "../../../common/inboundStatus"

interface ICreateInboundDTO {
  dorayakiId: number
  amount: number
  note: string
}

interface InboundDTO {
  dorayaki: DorayakiDAO
  amount: number
  createdAt: Date
  status: InboundStatus
  note: string
}

function ConvertInbound(item: InboundDAO): InboundDTO {
  return {
    amount: item.amount,
    createdAt: item.createdAt,
    dorayaki: item.dorayaki,
    status: item.status,
    note: item.note,
  }
}

export { InboundDTO, ConvertInbound, ICreateInboundDTO }
