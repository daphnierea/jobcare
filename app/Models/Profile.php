<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    /**
     * Assignable attributes
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'middle_name',
        'contact_number',
        'email',
    ];

    /**
     * Native type cast attributes
     */
    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    /**
     * Hidden attributes
     */
    protected $hidden = [
        'user_id',
        'created_at',
        'updated_at',
    ];

    /**
     * Mutators and Accessors
     */
    public function getFullNameAttribute($value)
    {
        return $this->attributes['first_name'] . ' ' . $this->attributes['middle_name'] . ' ' . $this->attributes['last_name'];
    }

    /**
     * Get owning user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get owned genealogies
     */
    public function genealogies()
    {
        return $this->hasMany(Genealogy::class);
    }

    /**
     * Branch Wallet (Branch Roles)
     */
    public function branchWallet()
    {
        return $this->hasOne(BranchWallet::class);
    }

    /**
     * Get owned product keys
     */
    public function productKeys()
    {
        return $this->hasMany(ProductKey::class, 'creator_id');
    }

    /**
     * Get owned activation keys
     */
    public function activationKeys() {
        return $this->hasMany(ActivationKey::class, 'creator_id');
    }

    /**
     * Get owned product purchases (purchaser)
     */
    public function productPurchaseAsPurchaser()
    {
        return $this->hasMany(ProductPurchase::class, 'purchaser_id');
    }

    /**
     * Get owned product purchases (receiver)
     */
    public function productPurchaseAsReceiver()
    {
        return $this->hasMany(ProductPurchase::class, 'receiver_id');
    }
}
