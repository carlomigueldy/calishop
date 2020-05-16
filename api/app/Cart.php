<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cart extends Model
{
    use SoftDeletes;
    
    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    /**
     * A shopping cart contains many items that was selected.
     * 
     * @return HasMany
     */
    public function items()
    {
        return $this->hasMany(CartProduct::class);
    }

    /**
     * The cart belongs to a user.
     * 
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Sum all item price and update total amount.
     * 
     * @return Boolean
     */
    public function calculateTotalAmount()
    {
        return $this->update([
            'total_amount' => array_sum(
                $this->items->pluck('price')->all()
            )
        ]);
    }
}
