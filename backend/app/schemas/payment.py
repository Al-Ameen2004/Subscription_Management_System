from datetime import date
from pydantic import BaseModel, ConfigDict, Field


class PaymentCreate(BaseModel):
    invoice_id: int = Field(gt=0)
    payment_method: str = Field(min_length=2, max_length=50)
    amount: float = Field(gt=0)
    payment_date: date
    note: str | None = None


class PaymentRead(BaseModel):
    id: int
    invoice_id: int
    payment_method: str
    amount: float
    payment_date: date
    note: str | None

    model_config = ConfigDict(from_attributes=True)