<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Gallery extends Model implements HasMedia, Sortable
{
    /** @use HasFactory<\Database\Factories\GalleryFactory> */
    use HasFactory, InteractsWithMedia, SortableTrait;

    protected $fillable = [
        'gallery_group_id',
        'order_column',
    ];

    public $sortable = [
        'order_column_name' => 'order_column',
        'sort_when_creating' => true,
    ];

    public function buildSortQuery()
    {
        return static::query()->where('gallery_group_id', $this->gallery_group_id);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<\App\Models\GalleryGroup, $this>
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(GalleryGroup::class, 'gallery_group_id');
    }
}
