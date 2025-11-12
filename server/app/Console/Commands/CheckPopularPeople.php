<?php

namespace App\Console\Commands;

use App\Mail\PopularPersonAlert;
use App\Services\PeopleService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class CheckPopularPeople extends Command
{
    protected $signature = 'people:check-popular {--threshold=50}';

    protected $description = 'Check for people with 50+ likes and send email to admin';

    public function __construct(
        private readonly PeopleService $peopleService
    ) {
        parent::__construct();
    }

    public function handle(): int
    {
        $threshold = (int) $this->option('threshold');
        $popularPeople = $this->peopleService->getPeopleWithLikesCount($threshold);

        if ($popularPeople->isEmpty()) {
            $this->info('No people found with '.$threshold.' or more likes.');

            return Command::SUCCESS;
        }

        $adminEmail = config('mail.from.address', 'admin@example.com');

        foreach ($popularPeople as $person) {
            Mail::to($adminEmail)->send(new PopularPersonAlert($person, $person->likes_count));
            $this->info("Sent alert for {$person->name} with {$person->likes_count} likes to {$adminEmail}");
        }

        $this->info('Total alerts sent: '.$popularPeople->count());

        return Command::SUCCESS;
    }
}
