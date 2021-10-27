<?php

namespace App;


use Illuminate\Notifications\Notifiable;

use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'nombre_factura',
        'fecha_emision',
        'importe',
        'direccion_suministro',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
    ];
}
