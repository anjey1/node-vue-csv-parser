<template>
    <div class="display-board" >
            <div class="content_holder">
                <h5 style="color:black;padding-top: 7px">Select an csv to import</h5>
                <input id="fileSelect" type="file" ref="inputFile"
                       @input="setUploadFile()"
                       accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                <div class="btn">
                    <button @click='getAllRests()' type="button" class="btn btn-warning">Get all Restaurants - Currently We Have {{numberOfResturaunts}}</button>
                </div>
            </div>
    </div>
</template>

<script>
	export default {
		name: 'DisplayBoard',
		props: ['numberOfResturaunts'],
		methods: {
			getAllRests() {
				this.$emit('getAllRests')
			},
			async setUploadFile(){
				let file = this.$refs.inputFile.files[0];
				if (file.type === "text/csv"){
					// Api call
					await this.getData(file, this.emitCsv);
				}
				else {
					alert("error - The file-type doesn't belong to text/csv")
				}
			},
			async getData(file, callback){
				let obj_csv = {
					size:0,
					dataFile:[]
				};

				let reader = new FileReader();
				await reader.readAsBinaryString(file);
				reader.onload = await function (e) {

					function parseData(data){
						let csvData = [];
						let lbreak = data.split("\n");
						lbreak.forEach(res => {
							csvData.push(res.split(","));
						});

						callback(csvData);
					}

					obj_csv.size = e.total;
					obj_csv.dataFile = e.target.result
					parseData(obj_csv.dataFile)
				};
            },
            emitCsv(data){
				this.$emit('postCsv',{'dataFile': data});
            }
		}
	}
</script>
<style scoped>
    .display-board{
        background-image: url("../assets/background.jpg");
    }
    .content_holder{
        background-color: rgb(173, 228, 251); opacity: 0.9; border-radius: 5px;padding: 10px;
    }
</style>
