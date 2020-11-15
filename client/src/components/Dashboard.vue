<template>
    <div class="hello">
        <div class="container mrgnbtm">
            <div class="row">
                <div class="col-md-12">
                    <h3>Restaurants View</h3>
                    <DisplayBoard
                            :numberOfResturaunts="numberOfResturaunts"
                            @getAllRests="getAllRests($event)"
                            @postCsv="postCsv($event)"
                    />
                </div>
            </div>
        </div>

        <div class="row mrgnbtm">
            <Restaurants v-if="restaurants.length > 0"
                         :restaurants="restaurants"
                         @editRest="editRest($event)"
                         @deleteRest="deleteRest($event)"
            />
        </div>
    </div>
</template>

<script>
	import DisplayBoard from './DisplayRestaurants'
	import Restaurants from './Restaurants'
	import { getAllRests, postCsv, editRest, deleteRest } from '../services/ResaurantsService'
	export default {
		name: 'Dashboard',
		components: {
			DisplayBoard,
			Restaurants
		},
		data() {
			return {
				restaurants: [],
				numberOfResturaunts: 0
			}
		},
		methods: {
			postCsv(file) {
				if(file.dataFile){
					postCsv(file.dataFile).then((response) => {
						if (response) {
                            this.restaurants = response;
                            this.numberOfResturaunts = this.restaurants.length
						}
                    })
				}
			},
			getAllRests() {
				getAllRests().then((response) => {
						this.restaurants = response.results;
						this.numberOfResturaunts = this.restaurants.length;
					})

			},
			editRest(data) {
				editRest(data).then((response) => {
					let rest = this.restaurants.findIndex((obj => obj.id === response.results.id));
					this.restaurants[rest] = response.results;
					this.restaurants = Object.assign([], this.restaurants)
				});
			},
			deleteRest(data) {
				deleteRest(data).then(response => {
					let restArray = this.restaurants.filter(obj => { return obj.id !== response.results});
					this.restaurants = Object.assign([], restArray)
					this.numberOfResturaunts = this.restaurants.length;
				});
			}

		},
		mounted () {
			this.getAllRests();
		}
	}
</script>
