<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Gallery extends Model implements HasMedia, Sortable
{
    /** @use HasFactory<\Database\Factories\GalleryFactory> */
    use HasFactory, InteractsWithMedia, SortableTrait;

    protected $fillable = [
        'gallery_group_id',
        'order_column',
    ];

    public array $sortable = [
        'order_column_name' => 'order_column',
        'sort_when_creating' => true,
    ];

    public function buildSortQuery(): \Illuminate\Database\Eloquent\Builder|Gallery
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

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('gallery')
            ->useDisk('public');
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('small')
            ->width(300)
            ->height(300)
            ->fit(Fit::Crop, 300, 300)
            ->format('webp')
            ->nonQueued()
            ->performOnCollections('images');

        $this->addMediaConversion('medium')
            ->width(600)
            ->height(600)
            ->fit(Fit::Crop, 600, 600)
            ->format('webp')
            ->nonQueued()
            ->performOnCollections('images');

        $this->addMediaConversion('large')
            ->width(1200)
            ->height(1200)
            ->fit(Fit::Crop, 1200, 1200)
            ->format('webp')
            ->nonQueued()
            ->performOnCollections('images');

        $this->addMediaConversion('original')
            ->format('webp')
            ->nonQueued()
            ->performOnCollections('images');
    }
}
