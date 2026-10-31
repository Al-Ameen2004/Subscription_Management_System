from datetime import date
from pydantic import BaseModel, ConfigDict, Field


class InvoiceCreate(BaseModel):
    subscription_id: int = Field(gt=0)
    issue_date: date
    due_date: date
    amount: float = Field(ge=0)


class InvoiceRead(BaseModel):
    id: int
    invoice_number: str
    subscription_id: int
    issue_date: date
    due_date: date
    amount: float
    status: str

    model_config = ConfigDict(from_attributes=True)


class InvoiceStatusUpdate(BaseModel):
    status: str = Field(pattern="^(draft|confirmed|paid)$")