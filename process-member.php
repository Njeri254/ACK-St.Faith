<?php
$data = file_get_contents("leaders.json");
$leaders = json_decode($data, true);

foreach ($leaders as $leader) {
    echo '
    <div class="bg-white p-4 rounded-xl shadow-md text-center">
        <img src="' . $leader['image'] . '" alt="' . $leader['name'] . '" class="w-32 h-32 rounded-full mx-auto mb-4" />
        <h3 class="text-xl font-bold">' . $leader['name'] . '</h3>
        <p class="text-gray-600">' . $leader['title'] . '</p>
        <p class="text-sm mt-2">' . $leader['bio'] . '</p>
    </div>';
}
?>
