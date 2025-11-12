<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\DislikePersonRequest;
use App\Http\Requests\LikePersonRequest;
use App\Services\PeopleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class PeopleController extends Controller
{
    public function __construct(
        private readonly PeopleService $peopleService
    ) {}

    #[OA\Get(
        path: '/api/v1/people',
        operationId: 'getRecommendedPeople',
        summary: 'Get recommended people',
        description: 'Returns a paginated list of recommended people for the authenticated user',
        tags: ['People'],
        security: [['sanctum' => []]],
        parameters: [
            new OA\Parameter(
                name: 'page',
                in: 'query',
                description: 'Page number',
                required: false,
                schema: new OA\Schema(type: 'integer', example: 1)
            ),
            new OA\Parameter(
                name: 'per_page',
                in: 'query',
                description: 'Items per page',
                required: false,
                schema: new OA\Schema(type: 'integer', example: 15)
            ),
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Successful response',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(
                            property: 'data',
                            type: 'array',
                            items: new OA\Items(
                                type: 'object',
                                properties: [
                                    new OA\Property(property: 'id', type: 'integer', example: 7),
                                    new OA\Property(property: 'user_id', type: 'integer', example: 7),
                                    new OA\Property(property: 'name', type: 'string', example: 'Emily'),
                                    new OA\Property(property: 'age', type: 'integer', example: 26),
                                    new OA\Property(
                                        property: 'pictures',
                                        type: 'array',
                                        items: new OA\Items(
                                            type: 'object',
                                            properties: [
                                                new OA\Property(property: 'id', type: 'integer', example: 1),
                                                new OA\Property(property: 'people_id', type: 'integer', example: 7),
                                                new OA\Property(property: 'url', type: 'string', format: 'uri', example: 'https://res.cloudinary.com/dmbeqfkwt/image/upload/v1762866324/tinder-female-2_nbr530.jpg'),
                                                new OA\Property(property: 'order', type: 'integer', example: 0),
                                                new OA\Property(property: 'created_at', type: 'string', format: 'date-time'),
                                                new OA\Property(property: 'updated_at', type: 'string', format: 'date-time'),
                                            ]
                                        )
                                    ),
                                    new OA\Property(property: 'location', type: 'string', example: 'Seattle, WA'),
                                    new OA\Property(property: 'gender', type: 'string', enum: ['M', 'F'], example: 'F'),
                                    new OA\Property(property: 'created_at', type: 'string', format: 'date-time', example: '2025-11-11T13:17:09.000000Z'),
                                    new OA\Property(property: 'updated_at', type: 'string', format: 'date-time', example: '2025-11-11T13:17:09.000000Z'),
                                ]
                            )
                        ),
                        new OA\Property(property: 'current_page', type: 'integer', example: 1),
                        new OA\Property(property: 'first_page_url', type: 'string', format: 'uri', example: 'http://127.0.0.1:8000/api/v1/people?page=1'),
                        new OA\Property(property: 'from', type: 'integer', nullable: true, example: 1),
                        new OA\Property(property: 'last_page', type: 'integer', example: 1),
                        new OA\Property(property: 'last_page_url', type: 'string', format: 'uri', example: 'http://127.0.0.1:8000/api/v1/people?page=1'),
                        new OA\Property(
                            property: 'links',
                            type: 'array',
                            items: new OA\Items(
                                type: 'object',
                                properties: [
                                    new OA\Property(property: 'url', type: 'string', format: 'uri', nullable: true, example: null),
                                    new OA\Property(property: 'label', type: 'string', example: '&laquo; Previous'),
                                    new OA\Property(property: 'active', type: 'boolean', example: false),
                                    new OA\Property(property: 'page', type: 'integer', nullable: true, example: null),
                                ]
                            )
                        ),
                        new OA\Property(property: 'next_page_url', type: 'string', format: 'uri', nullable: true, example: null),
                        new OA\Property(property: 'path', type: 'string', format: 'uri', example: 'http://127.0.0.1:8000/api/v1/people'),
                        new OA\Property(property: 'per_page', type: 'integer', example: 15),
                        new OA\Property(property: 'prev_page_url', type: 'string', format: 'uri', nullable: true, example: null),
                        new OA\Property(property: 'to', type: 'integer', nullable: true, example: 4),
                        new OA\Property(property: 'total', type: 'integer', example: 4),
                    ]
                )
            ),
            new OA\Response(
                response: 401,
                description: 'Unauthenticated',
            ),
        ]
    )]
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->get('per_page', 15);
        $people = $this->peopleService->getRecommendedPeople($request->user(), $perPage);

        return response()->json($people);
    }

    #[OA\Post(
        path: '/api/v1/people/like',
        operationId: 'likePerson',
        summary: 'Like a person',
        description: 'Like a person',
        tags: ['People'],
        security: [['sanctum' => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: 'people_id', type: 'integer', example: 1),
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: 'Person liked successfully',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'message', type: 'string', example: 'Person liked successfully'),
                    ]
                )
            ),
            new OA\Response(
                response: 422,
                description: 'Validation error',
            ),
            new OA\Response(
                response: 401,
                description: 'Unauthenticated',
            ),
        ]
    )]
    public function like(LikePersonRequest $request): JsonResponse
    {
        $this->peopleService->likePerson($request->user(), $request->validated()['people_id']);

        return response()->json(['message' => 'Person liked successfully']);
    }

    #[OA\Post(
        path: '/api/v1/people/dislike',
        operationId: 'dislikePerson',
        summary: 'Dislike a person',
        description: 'Dislike a person',
        tags: ['People'],
        security: [['sanctum' => []]],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: 'people_id', type: 'integer', example: 1),
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: 'Person disliked successfully',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'message', type: 'string', example: 'Person disliked successfully'),
                    ]
                )
            ),
            new OA\Response(
                response: 422,
                description: 'Validation error',
            ),
            new OA\Response(
                response: 401,
                description: 'Unauthenticated',
            ),
        ]
    )]
    public function dislike(DislikePersonRequest $request): JsonResponse
    {
        $this->peopleService->dislikePerson($request->user(), $request->validated()['people_id']);

        return response()->json(['message' => 'Person disliked successfully']);
    }

    #[OA\Get(
        path: '/api/v1/people/liked',
        operationId: 'getLikedPeople',
        summary: 'Get liked people list',
        description: 'Returns a list of all people the authenticated user has liked',
        tags: ['People'],
        security: [['sanctum' => []]],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Successful response',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(
                            property: 'data',
                            type: 'array',
                            items: new OA\Items(
                                type: 'object',
                                properties: [
                                    new OA\Property(property: 'id', type: 'integer', example: 7),
                                    new OA\Property(property: 'user_id', type: 'integer', example: 7),
                                    new OA\Property(property: 'name', type: 'string', example: 'Emily'),
                                    new OA\Property(property: 'age', type: 'integer', example: 26),
                                    new OA\Property(
                                        property: 'pictures',
                                        type: 'array',
                                        items: new OA\Items(
                                            type: 'object',
                                            properties: [
                                                new OA\Property(property: 'id', type: 'integer', example: 1),
                                                new OA\Property(property: 'people_id', type: 'integer', example: 7),
                                                new OA\Property(property: 'url', type: 'string', format: 'uri', example: 'https://res.cloudinary.com/dmbeqfkwt/image/upload/v1762866324/tinder-female-2_nbr530.jpg'),
                                                new OA\Property(property: 'order', type: 'integer', example: 0),
                                                new OA\Property(property: 'created_at', type: 'string', format: 'date-time'),
                                                new OA\Property(property: 'updated_at', type: 'string', format: 'date-time'),
                                            ]
                                        )
                                    ),
                                    new OA\Property(property: 'location', type: 'string', example: 'Seattle, WA'),
                                    new OA\Property(property: 'gender', type: 'string', enum: ['M', 'F'], example: 'F'),
                                    new OA\Property(property: 'created_at', type: 'string', format: 'date-time', example: '2025-11-11T13:17:09.000000Z'),
                                    new OA\Property(property: 'updated_at', type: 'string', format: 'date-time', example: '2025-11-11T13:17:09.000000Z'),
                                ]
                            )
                        ),
                    ]
                )
            ),
            new OA\Response(
                response: 401,
                description: 'Unauthenticated',
            ),
        ]
    )]
    public function liked(Request $request): JsonResponse
    {
        $likedPeople = $this->peopleService->getLikedPeople($request->user());

        return response()->json(['data' => $likedPeople]);
    }

    #[OA\Post(
        path: '/api/v1/people/undo',
        operationId: 'undoLastAction',
        summary: 'Undo last action',
        description: 'Undo the last like or dislike action performed by the authenticated user',
        tags: ['People'],
        security: [['sanctum' => []]],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Action undone successfully',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'message', type: 'string', example: 'Action undone successfully'),
                        new OA\Property(property: 'data', type: 'object', properties: [
                            new OA\Property(property: 'people_id', type: 'integer', example: 1),
                            new OA\Property(property: 'action', type: 'string', enum: ['like', 'dislike'], example: 'like'),
                        ]),
                    ]
                )
            ),
            new OA\Response(
                response: 404,
                description: 'No action to undo',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'message', type: 'string', example: 'No action to undo'),
                    ]
                )
            ),
            new OA\Response(
                response: 401,
                description: 'Unauthenticated',
            ),
        ]
    )]
    public function undo(Request $request): JsonResponse
    {
        $result = $this->peopleService->undoLastAction($request->user());

        if (! $result) {
            return response()->json(['message' => 'No action to undo'], 404);
        }

        return response()->json([
            'message' => 'Action undone successfully',
            'data' => $result,
        ]);
    }

    #[OA\Get(
        path: '/api/v1/people/interactions',
        operationId: 'getInteractedPeopleIds',
        summary: 'Get all interacted people IDs',
        description: 'Returns an array of all people IDs that the authenticated user has interacted with (liked or disliked)',
        tags: ['People'],
        security: [['sanctum' => []]],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Successful response',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(
                            property: 'data',
                            type: 'array',
                            items: new OA\Items(type: 'integer'),
                            example: [1, 2, 3, 4, 5]
                        ),
                    ]
                )
            ),
            new OA\Response(
                response: 401,
                description: 'Unauthenticated',
            ),
        ]
    )]
    public function interactions(Request $request): JsonResponse
    {
        $peopleIds = $this->peopleService->getInteractedPeopleIds($request->user());

        return response()->json(['data' => $peopleIds]);
    }
}
