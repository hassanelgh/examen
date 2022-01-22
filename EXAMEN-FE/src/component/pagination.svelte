<script>

    export let pages;
    export let pageI;
    export let pageF;
    export let Previous;
    export let next; 
    export let pageMaintenant;
    export let getMovies

</script>


<nav aria-label="" class="container  w-100 d-flex justify-content-center">
    <ul class="pagination table-shadow-border">
        <li class="page-item"><button class="page-link" on:click="{() => getMovies(Previous)}">Previous</button></li>
     {#each pages as page }
     {#if page<=pageF && page>=pageI}
        <li class="page-item {pageMaintenant== page ? 'active' : ''}"><button class="page-link" on:click="{() => getMovies(page)}">{page}</button></li>
     {/if}
     {/each}
         <li class="page-item"><button class="page-link" on:click="{() => getMovies(next)}">Next</button></li>
    </ul>
</nav>

<style>
    .table-shadow-border{
		box-shadow: 0px 4px 3px #406580;
		border: 2px solid black;
	}
</style>