<script>
	
	export let name;
	import { onMount } from 'svelte';
	import Pagination from "./component/pagination.svelte";

	let movies=[];
	let pagination={};
	
	let pages =[];
	let pageMaintenant=1;
	let pageI;
	let pageF;
	let next=2;
	let Previous=1;


	async function getMovies(Npage) {
		if (!Npage) {
			Npage=1;
		}
		pageMaintenant =Npage;
		
		const take=10;
		const skip=(Npage-1)*10;

		fetch("http://localhost:3000/movies?take="+take+"&skip="+skip)
		.then((res) => res.json())
		.then((res) => {
			movies = res.data;
			pagination=res.pagination;
			pageF=pagination.count.id/take
			pageI=0
			if(Npage-5 >= 0){
				pageI=Npage-5;
			};
			if(Npage+5 <pagination.count.id/take){
				pageF=Npage+5;
			};
			if(pageF<=10){
				pageF=10;
			}
			pages=[];
			for (let index = 0; index < pagination.count.id/take; index++) {
				pages=[ ...pages ,index+1];
				
			}
						
			Previous = Npage-1 >0 ? Npage-1 : 1;
			next = Npage+1 <=pagination.count.id/take ? Npage+1 : pagination.count.id/take;
		});
	}

	onMount(() => {
		getMovies();
	});

</script>

<main>
	<h1 class="w-100 text-center title">{name}</h1>
	<div class="decor mt-1 mb-2 w-100"></div>
	<div class="decor mt-1 mb-2 w-100"></div>
	<div class="container  my-3">
		<table class="table table-striped table-bordered table-shadow-border">
			<thead class="table-head">
			  <tr>
				<th scope="col">Title</th>
				<th scope="col">Genres</th>
				<th scope="col">Year</th>
			  </tr>
			</thead>
			<tbody>
				{#each movies as movie }
					<tr>
						<td>{movie.title}</td>
						<td>
							{#each movie.genres as genre}
								{genre} , 
							{/each}
						</td>
						<td>{movie.year}</td>
					</tr>
				{/each}
			</tbody>
		</table>

	</div>	

</main>

<Pagination pages={pages} pageI={pageI} pageF={pageF} Previous={Previous} next={next} pageMaintenant={pageMaintenant} {getMovies}/>

<style>
	.table-shadow-border{
		box-shadow: 0px 4px 3px #406580;
		border: 2px solid black;
	}
	.table-head{
		background-color: #406580;
		color: #17E6CD;
	}
	.title{
		background-color:#17E6CD;
		font-weight: bold;
		color:#406580;
		font-size: 60px;
		border-bottom: 5px solid #406580;
		box-shadow: 0px 2px 3px #406580;

	}
	.decor{
		background-color: #17E6CD;
		height: 10px;
		border-bottom: 3px solid #406580;
		box-shadow: 0px 2px 3px #406580;
	}
</style>