import uuid
from sqlalchemy.orm import Session

from app.models.invoice import Invoice
from app.models.subscription import Subscription
from app.schemas.invoice import InvoiceCreate


def create_invoice(db: Session, data: InvoiceCreate):
    subscription = db.query(Subscription).filter(
        Subscription.id == data.subscription_id
    ).first()

    if not subscription:
        raise ValueError("Subscription not found")

    if data.due_date < data.issue_date:
        raise ValueError("Due date cannot be before issue date")

    invoice = Invoice(
        invoice_number=f"INV-{uuid.uuid4().hex[:8].upper()}",
        subscription_id=data.subscription_id,
        issue_date=data.issue_date,
        due_date=data.due_date,
        amount=data.amount,
        status="draft"
    )

    db.add(invoice)
    db.commit()
    db.refresh(invoice)
    return invoice


def get_invoices(db: Session):
    return db.query(Invoice).all()


def get_invoice(db: Session, invoice_id: int):
    return db.query(Invoice).filter(Invoice.id == invoice_id).first()


def update_invoice_status(db: Session, invoice_id: int, new_status: str):
    invoice = get_invoice(db, invoice_id)

    if not invoice:
        return None

    invoice.status = new_status
    db.commit()
    db.refresh(invoice)
    return invoice