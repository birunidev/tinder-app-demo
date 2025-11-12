<?php

namespace App\Mail;

use App\Models\People;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PopularPersonAlert extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public People $person,
        public int $likesCount
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Popular Person Alert - '.$this->person->name.' has '.$this->likesCount.' likes',
        );
    }

    public function content(): Content
    {
        return new Content(
            html: 'emails.popular-person-alert',
            text: 'emails.popular-person-alert-text',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
