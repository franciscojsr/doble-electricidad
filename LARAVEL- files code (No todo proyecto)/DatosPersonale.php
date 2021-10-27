<?php

namespace App;


use Illuminate\Notifications\Notifiable;

use Illuminate\Database\Eloquent\Model;

class DatosPersonale extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'nombre_titular',
        'email',
        'fecha_alta',
        'direccion_envio',
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
