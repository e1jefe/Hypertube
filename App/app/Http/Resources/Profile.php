<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Profile extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
        'user_id' => $this->user_id,
        'f-name' => $this->f_name,
        'l-name' => $this->l_name,
            'test' => 'Vital9',
        'user_pick' => $this->user_pick,
        'bio' => $this->bio
        ];
    }
}
