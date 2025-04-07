<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'name', 'email', 'address', 'city', 'state', 'zip', 'mobile',
        'subtotal', 'shipping', 'grand_total', 'discount',
        'payment_status', 'status', 'user_id'
    ];

    // Enum values mapping
    public const PAYMENT_STATUSES = [
        'PAID' => 'paid',
        'NON_PAID' => 'non_paid'
    ];

    // Accessor to get consistent payment status
    public function getPaymentStatusAttribute($value)
    {
        return $value === 'paid' ? 'Paid' : 'Non Paid';
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function casts(): array
    {
        return[
            'created_at' => 'datetime:d M, Y',
        ];
    }
}
