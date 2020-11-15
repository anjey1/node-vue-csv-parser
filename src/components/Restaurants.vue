<template>
    <div class="container">
        <div class="search-wrapper">
            <label>Search By Title: </label>
            <input type="text" v-model="search" placeholder="Search Restaurant.."/>
        </div>
        <h2>Restaurants</h2>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in filteredList" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.location }}</td>
                <td><b-button id="show-btn" @click="showModal(item)">Edit</b-button></td>
                <td><b-button id="show-btn" @click="deleteRest(item)">Delete</b-button></td>

            </tr>
            </tbody>
        </table>
        <b-modal ref="my-modal" hide-footer title="Edit Restaurant">
            <div class="d-block text-center">
                <b-form-input v-model="restObj.name" placeholder="Enter Rest Name"></b-form-input>
                <b-form-input v-model="restObj.type" placeholder="Enter Rest Type"></b-form-input>
                <b-form-input v-model="restObj.phone" placeholder="Enter Rest Phone"></b-form-input>
                <b-form-input v-model="restObj.location" placeholder="Enter Rest Location"></b-form-input>
            </div>
            <b-button class="mt-3" variant="outline-danger" block @click="editRest(restObj)">Save</b-button>
            <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
        </b-modal>
    </div>
</template>

<script>
	export default {
		name: 'Restaurants',
		props: ['restaurants'],
		data() {
			return {
				search: '',
                restObj:{
					id:'',
					name:'',
                    type:'',
                    phone:'',
                    location:''
                }
			}
		},
        methods: {
            filterRestaurants (restaurant) {
				return restaurant.name.toLowerCase().includes(this.search.toLowerCase())
            },
            editRest(item) {
				this.$refs['my-modal'].hide();
				this.$emit('editRest',{'rest': item});
            },
			deleteRest(item) {
				this.$emit('deleteRest',{'id': item.id});

			},
			showModal(item) {
				Object.assign(this.restObj, item);
				this.$refs['my-modal'].show()
			},
			hideModal() {
				this.$refs['my-modal'].hide();
			},
        },
		computed: {
			filteredList() {
				return this.restaurants.filter(rest => {return this.filterRestaurants(rest)}
				)
			}
		}
	}
</script>
<style scoped>

    input{
        margin-left: 10px;
        border-radius: 10px;
    }

    input:focus{
        outline: none;
    }
</style>
