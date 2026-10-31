from datetime import date
from typing import Literal
from pydantic import BaseModel, ConfigDict, Field, model_validator


class SubscriptionCreate(BaseModel):
    customer_id: int = Field(gt=0)
    plan_id: int = Field(gt=0)
    start_date: date
    expiry_date: date
    payment_terms: str = "Due on receipt"

    @model_validator(mode="after")
    def validate_dates(self):
        if self.expiry_date < self.start_date:
            raise ValueError("Expiry date cannot be before start date")
        return self


class SubscriptionRead(BaseModel):
    id: int
    subscription_number: str
    customer_id: int
    plan_id: int
    start_date: date
    expiry_date: date
    payment_terms: str
    status: str

    model_config = ConfigDict(from_attributes=True)


class SubscriptionStatusUpdate(BaseModel):
    status: Literal["draft", "quotation", "confirmed", "active", "paused", "closed"]