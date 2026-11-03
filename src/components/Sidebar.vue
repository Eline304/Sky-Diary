<script lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="sidebar-nav">
        <RouterLink to="/trips" class="nav-item" active-class="active">
            <span class="nav-icon"><svg fill="#000000" version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 width="20px" height="20px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
<g>
	<path d="M62,6H10C8.896,6,8,6.896,8,8v6H2c-1.104,0-2,0.896-2,2v40c0,1.104,0.896,2,2,2h52c1.104,0,2-0.896,2-2v-6h6
		c1.104,0,2-0.896,2-2V8C64,6.896,63.104,6,62,6z M52,18v31.651l-10.698-9.17c-0.656-0.561-1.595-0.639-2.331-0.196l-8.566,5.14
		L17.505,30.683c-0.364-0.416-0.885-0.663-1.438-0.682c-0.551-0.015-1.089,0.193-1.48,0.585L4,41.172V18H52z M4,46.828
		l11.902-11.902l12.593,14.392c0.639,0.729,1.705,0.897,2.534,0.397l8.764-5.258L50.927,54H4V46.828z M60,46h-4V16
		c0-1.104-0.896-2-2-2H12v-4h48V46z"/>
	<path d="M41,36c3.859,0,7-3.141,7-7s-3.141-7-7-7s-7,3.141-7,7S37.141,36,41,36z M41,26c1.654,0,3,1.346,3,3s-1.346,3-3,3
		s-3-1.346-3-3S39.346,26,41,26z"/>
</g>
</svg></span>
            Albums
        </RouterLink>

        <RouterLink to="/favourites" class="nav-item" active-class="active">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Interface / Heart_01">
<path id="Vector" d="M12 7.69431C10 2.99988 3 3.49988 3 9.49991C3 15.4999 12 20.5001 12 20.5001C12 20.5001 21 15.4999 21 9.49991C21 3.49988 14 2.99988 12 7.69431Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>
            Favourites
        </RouterLink>

        <RouterLink to="/trash" class="nav-item" active-class="active">
            <span class="nav-icon"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></span>
            Trash
        </RouterLink>
    </nav>
</template>

<style>

.sidebar-nav {
    padding: 1em 3em 1em 0em;
    display: flex;
    flex-direction: column;
    width: 210px;
    flex-shrink: 0;
    gap: 1em;
}

a {
    color: black;
    text-decoration: none;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 2em;
    padding: 1em;
    border-radius: 8px;
}

.nav-item:hover {
    background-color: #dfdfdf;
}

.nav-item.active {
    background-color: #c0ecff;
}


@media screen and (max-width: 768px) {
    .sidebar-nav {
        width: 100%;
        padding: 0;
        margin-bottom: 16px;
        box-sizing: border-box;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        gap: 8px;
    }

    .nav-item {
        flex: 1;
        min-width: 0;
        justify-content: center;
        align-items: center;
        gap: 6px;
        padding: 10px 4px;
        font-size: 12px;
        white-space: nowrap;
    }

    .nav-item svg,
    .nav-item .nav-icon {
        flex-shrink: 0;
    }
}



</style>