<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryGroup extends Model
{
    protected $fillable = [
        'name',
        'slug',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<\App\Models\Gallery, $this>
     */
    public function galleries(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Gallery::class)->orderBy('order_column');
    }
}
