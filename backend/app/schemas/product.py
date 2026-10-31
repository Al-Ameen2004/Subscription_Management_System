from pydantic import BaseModel, Field, ConfigDict


class ProductCreate(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    product_type: str
    sales_price: float = Field(ge=0)
    cost_price: float = Field(ge=0)
    notes: str | None = None


class ProductRead(BaseModel):
    id: int
    name: str
    product_type: str
    sales_price: float
    cost_price: float
    notes: str | None

    model_config = ConfigDict(from_attributes=True)


class ProductUpdate(BaseModel):
    name: str | None = None
    product_type: str | None = None
    sales_price: float | None = Field(default=None, ge=0)
    cost_price: float | None = Field(default=None, ge=0)
    notes: str | None = None