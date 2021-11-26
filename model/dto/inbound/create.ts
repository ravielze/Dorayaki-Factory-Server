import { IsAscii, IsInt, Max, MaxLength, Min, MinLength } from "class-validator"
import { BaseDTOConstructor as ParseAndOmit } from ".."
import { ICreateInboundDTO } from "."
import { InboundDAO } from "../../dao/inbound"
import { InboundStatus } from "../../../common/inboundStatus"

export class CreateInboundDTO implements ICreateInboundDTO {
  @Min(1, { message: "ID not valid. Minimum value is 1." })
  @Max(2 ** 32, { message: "ID reached maximum amount." })
  @IsInt({ message: "ID can not be floating point" })
  dorayakiId = 0

  @Min(0, { message: "Amount minimum value is 0." })
  @Max(2 ** 32, { message: "Amount reached maximum amount." })
  @IsInt({ message: "Amount can not be floating point" })
  amount = 0

  @MinLength(1, { message: "Note is too short. Minimum 1 characters." })
  @MaxLength(2048, {
    message: "Note is too long. Maximum 2048 characters.",
  })
  @IsAscii({
    message: "Note contains unallowed characters. Only ascii allowed.",
  })
  note = ""

  constructor(item: ICreateInboundDTO) {
    ParseAndOmit(item, this)
  }

  ToDAO(): InboundDAO {
    return new InboundDAO(
      this.dorayakiId,
      this.note,
      this.amount,
      InboundStatus.REQUESTING
    )
  }
}
