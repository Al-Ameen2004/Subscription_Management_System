from sqlalchemy.orm import Session

from app.models.payment import Payment
from app.models.invoice import Invoice
from app.schemas.payment import PaymentCreate


def create_payment(db: Session, data: PaymentCreate):
    invoice = db.query(Invoice).filter(
        Invoice.id == data.invoice_id
    ).first()

    if not invoice:
        raise ValueError("Invoice not found")

    if invoice.status == "paid":
        raise ValueError("Invoice is already paid")

    payment = Payment(
        invoice_id=data.invoice_id,
        payment_method=data.payment_method,
        amount=data.amount,
        payment_date=data.payment_date,
        note=data.note
    )

    db.add(payment)

    if data.amount >= invoice.amount:
        invoice.status = "paid"
    else:
        invoice.status = "confirmed"

    db.commit()
    db.refresh(payment)

    return payment


def get_payments(db: Session):
    return db.query(Payment).all()


def get_payment(db: Session, payment_id: int):
    return db.query(Payment).filter(
        Payment.id == payment_id
    ).first()