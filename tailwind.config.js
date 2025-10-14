/** @type {import('tailwindcss').Config} */
export default {
    // Adicione esta linha para ativar o modo escuro baseado em classe
    darkMode: 'class',

    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            // ... suas outras extensões de tema
        },
    },

    plugins: [
        // ... seus outros plugins
    ],
};
