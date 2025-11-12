<?php

namespace App\SwaggerProcessors;

use OpenApi\Analysis;
use OpenApi\Annotations\PathItem;

class StripVersionPrefix
{
    public function __invoke(Analysis $analysis, array $context = []): void
    {
        if (! $analysis->openapi || ! $analysis->openapi->paths) {
            return;
        }

        // Get all PathItem annotations
        $pathItems = $analysis->getAnnotationsOfType(PathItem::class);

        foreach ($pathItems as $pathItem) {
            if (isset($pathItem->path) && str_starts_with($pathItem->path, '/api/v1')) {
                $pathItem->path = str_replace('/api/v1', '', $pathItem->path);
            }
        }

        // Also update the paths array directly
        $pathsArray = [];
        foreach ($analysis->openapi->paths as $path => $pathItem) {
            if (is_string($path) && str_starts_with($path, '/api/v1')) {
                $newPath = str_replace('/api/v1', '', $path);
                $pathsArray[$newPath] = $pathItem;
            } else {
                $pathsArray[$path] = $pathItem;
            }
        }

        // Clear and repopulate paths
        foreach ($analysis->openapi->paths as $path => $pathItem) {
            unset($analysis->openapi->paths[$path]);
        }

        foreach ($pathsArray as $path => $pathItem) {
            $analysis->openapi->paths[$path] = $pathItem;
        }
    }
}
