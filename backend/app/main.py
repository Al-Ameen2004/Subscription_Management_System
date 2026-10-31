from contextlib import asynccontextmanager
from app.models.product import Product
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.plan import Plan
from app.database.base import Base
from app.database.connection import engine, get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserRead, UserLogin, Token
from app.services.user_service import register_user, login_user
from app.models.subscription import Subscription
from app.models.invoice import Invoice
from app.models.payment import Payment


# Create database tables when the application starts
@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="Brightloop Subscription Management System",
    description="Backend API for managing subscriptions, invoices and payments",
    version="1.0.0",
    lifespan=lifespan
)


@app.get("/")
def home():
    return {
        "message": "Welcome to Brightloop Subscription Management System!",
        "status": "Backend is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.post(
    "/api/customers/register",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED
)
def register_customer(
    customer: UserCreate,
    db: Session = Depends(get_db)
):
    try:
        new_user = register_user(db, customer)
        return new_user

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(error)
        )

@app.post("/api/auth/login", response_model=Token)
def login(
    login_data: UserLogin,
    db: Session = Depends(get_db)
):
    token = login_user(
        db,
        str(login_data.email),
        login_data.password
    )

    if token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    return {
        "access_token": token,
        "token_type": "bearer"
    }
from app.schemas.product import ProductCreate, ProductRead, ProductUpdate
from app.services.product_service import (
    create_product,
    get_products,
    get_product,
    update_product,
    delete_product
)

@app.post("/api/products", response_model=ProductRead, status_code=201)
def add_product(data: ProductCreate, db: Session = Depends(get_db)):
    return create_product(db, data)


@app.get("/api/products", response_model=list[ProductRead])
def list_products(db: Session = Depends(get_db)):
    return get_products(db)


@app.get("/api/products/{product_id}", response_model=ProductRead)
def read_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product(db, product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product


@app.put("/api/products/{product_id}", response_model=ProductRead)
def edit_product(
    product_id: int,
    data: ProductUpdate,
    db: Session = Depends(get_db)
):
    product = update_product(db, product_id, data)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product


@app.delete("/api/products/{product_id}")
def remove_product(product_id: int, db: Session = Depends(get_db)):
    if not delete_product(db, product_id):
        raise HTTPException(status_code=404, detail="Product not found")

    return {"message": "Product deleted successfully"}

from app.schemas.plan import PlanCreate, PlanRead, PlanUpdate
from app.services.plan_service import (
    create_plan,
    get_plans,
    get_plan,
    update_plan,
    delete_plan
)

@app.post("/api/plans", response_model=PlanRead, status_code=201)
def add_plan(data: PlanCreate, db: Session = Depends(get_db)):
    return create_plan(db, data)


@app.get("/api/plans", response_model=list[PlanRead])
def list_plans(db: Session = Depends(get_db)):
    return get_plans(db)


@app.get("/api/plans/{plan_id}", response_model=PlanRead)
def read_plan(plan_id: int, db: Session = Depends(get_db)):
    plan = get_plan(db, plan_id)

    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    return plan


@app.put("/api/plans/{plan_id}", response_model=PlanRead)
def edit_plan(
    plan_id: int,
    data: PlanUpdate,
    db: Session = Depends(get_db)
):
    plan = update_plan(db, plan_id, data)

    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    return plan


@app.delete("/api/plans/{plan_id}")
def remove_plan(plan_id: int, db: Session = Depends(get_db)):
    if not delete_plan(db, plan_id):
        raise HTTPException(status_code=404, detail="Plan not found")

    return {"message": "Plan deleted successfully"}

from app.schemas.subscription import (
    SubscriptionCreate,
    SubscriptionRead,
    SubscriptionStatusUpdate
)
from app.services.subscription_service import (
    create_subscription,
    get_subscriptions,
    get_subscription,
    update_subscription_status
)
from fastapi import HTTPException

@app.post("/api/subscriptions", response_model=SubscriptionRead, status_code=201)
def add_subscription(data: SubscriptionCreate, db: Session = Depends(get_db)):
    try:
        return create_subscription(db, data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/subscriptions", response_model=list[SubscriptionRead])
def list_subscriptions(db: Session = Depends(get_db)):
    return get_subscriptions(db)


@app.get("/api/subscriptions/{subscription_id}", response_model=SubscriptionRead)
def read_subscription(subscription_id: int, db: Session = Depends(get_db)):
    subscription = get_subscription(db, subscription_id)
    if not subscription:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return subscription


@app.patch("/api/subscriptions/{subscription_id}/status", response_model=SubscriptionRead)
def change_subscription_status(
    subscription_id: int,
    data: SubscriptionStatusUpdate,
    db: Session = Depends(get_db)
):
    subscription = update_subscription_status(db, subscription_id, data.status)
    if not subscription:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return subscription

from app.schemas.invoice import (
    InvoiceCreate,
    InvoiceRead,
    InvoiceStatusUpdate
)
from app.services.invoice_service import (
    create_invoice,
    get_invoices,
    get_invoice,
    update_invoice_status
)

@app.post("/api/invoices", response_model=InvoiceRead, status_code=201)
def add_invoice(data: InvoiceCreate, db: Session = Depends(get_db)):
    try:
        return create_invoice(db, data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/invoices", response_model=list[InvoiceRead])
def list_invoices(db: Session = Depends(get_db)):
    return get_invoices(db)


@app.get("/api/invoices/{invoice_id}", response_model=InvoiceRead)
def read_invoice(invoice_id: int, db: Session = Depends(get_db)):
    invoice = get_invoice(db, invoice_id)
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice


@app.patch("/api/invoices/{invoice_id}/status", response_model=InvoiceRead)
def change_invoice_status(
    invoice_id: int,
    data: InvoiceStatusUpdate,
    db: Session = Depends(get_db)
):
    invoice = update_invoice_status(db, invoice_id, data.status)
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice

from app.schemas.payment import PaymentCreate, PaymentRead
from app.services.payment_service import (
    create_payment,
    get_payments,
    get_payment
)

@app.post("/api/payments", response_model=PaymentRead, status_code=201)
def add_payment(data: PaymentCreate, db: Session = Depends(get_db)):
    try:
        return create_payment(db, data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/payments", response_model=list[PaymentRead])
def list_payments(db: Session = Depends(get_db)):
    return get_payments(db)


@app.get("/api/payments/{payment_id}", response_model=PaymentRead)
def read_payment(payment_id: int, db: Session = Depends(get_db)):
    payment = get_payment(db, payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment