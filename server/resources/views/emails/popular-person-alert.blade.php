<!DOCTYPE html>
<html>

<head>
    <title>Popular Person Alert</title>
</head>

<body>
    <h2>Popular Person Alert</h2>
    <p>A person has reached the popularity threshold!</p>

    <h3>Person Details:</h3>
    <ul>
        <li><strong>Name:</strong> {{ $person->name }}</li>
        <li><strong>Age:</strong> {{ $person->age }}</li>
        <li><strong>Location:</strong> {{ $person->location }}</li>
        <li><strong>Gender:</strong> {{ $person->gender }}</li>
        <li><strong>Total Likes:</strong> {{ $likesCount }}</li>
    </ul>

    <p>This person has received {{ $likesCount }} likes, which exceeds the threshold of 50.</p>
</body>

</html>