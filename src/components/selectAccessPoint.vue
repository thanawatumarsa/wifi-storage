<template lang="html">
  <div class="col-md-12" style="margin-top:3%">
    <div class="col-xs-12 col-md-4">
      <div class="nameap">
        <div class="cardContainer">
          <h4 style="text-align:center">Access point name</h4>
          <h3 style="text-align:center">{{wifidetail.apName}}</h3><hr>
          <h4>S/N : {{wifidetail.serial}}</h4>
          <h4>MAC : {{wifidetail.mac}}</h4>
          <h4>Location : {{wifidetail.location}}</h4>
          <h4>Channel : {{wifidetail.channel}}</h4>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-8 tablecard" style="margin-top:3.1%">
        <div class="location">
          <h3><center>Signal testing information.</center></h3><br>
          <button data-toggle="modal" data-target="#addLocation" type="button" class="btn btn-primary" data-dismiss="modal" >New location</button>
          <hr>
        </div>
        <div v-if="wifidetail.testLocation" class="">
          <div class="col-xs-8 col-md-8" style="margin-left:-2%">
            <div class="print">
              <a type="button" @click="myprint()" style="cursor:pointer ">
                Print report
              </a>
            </div>
          </div>
          <div class="col-xs-12 col-md-12" style="margin-bottom:3%">
          </div>
          <table class="table table">
              <thead>
                <tr>
                  <th data-toggle="modal" data-target="#basicModal">
                    <center>
                    Test Location
                    </center>
                  </th>
                  <th>
                    <center>
                    dBm
                    </center>
                  </th>
                  <th>
                    <center>
                    </center>
                  </th>
                </tr>
              </thead>
              <each-test-location :wifidetail="wifidetail" :locationindex="locationindex" :removeTestLocation="removeTestLocation" :editTestLocation="editTestLocation" :editTestLo="editTestLo" :testlocationindex="testlocationindex" :editLoSave="editLoSave" :print="print"></each-test-location>
            </table>
        </div>
          <div v-else class="col-xs-12 col-md-12" style="margin-bottom:8.3%">
            <h3>No information.</h3>
          </div>
    </div>
    <div class="modal fade" id="addLocation" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalLabel">Add Location</h4>
        </div>
        <div class="modal-body">
          <form>
              <div class="form-group">
                <input type="text" id="addProject" name="addProject" class="form-control" placeholder="Location" v-model="newTestLocation.location">
              </div>
              <div class="form-group">
                <input type="text" id="addProject" name="addProject" class="form-control" placeholder="dBm" v-model="newTestLocation.dbm">
              </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button @click="addTestLocation(wifidetail)" type="button" class="btn btn-primary" data-dismiss="modal">+ Add</button>
        </div>
      </div>
    </div>
  </div>
  </div>

</template>

<script>
import eachTestLocation from '@/components/eachTestLocation'

export default {
  props: ['wifidetail', 'addTestLocation', 'newTestLocation', 'locationindex', 'removeTestLocation', 'editTestLocation', 'editTestLo', 'testlocationindex', 'editLoSave', 'print'],
  components: {
    eachTestLocation
  },
  methods: {
    myprint: function () {
      window.print()
    }
  }
}
</script>

<style lang="css">
.tablecontrainer {
  margin-top: 5%;
}
.nameap {
  border: 2px solid #e6e6e6;
  border-radius: 5px;
  transition: 0.3s;
  margin-top: 10%;
  margin-left: -2.1%;
  margin-right: -2.1%;
  float: center;
  background-color: white;
}
.tablecard {
  border: 2px solid #e6e6e6;
  border-radius: 5px;
  transition: 0.3s;
  margin-top: 10%;
  background-color: white;
}
.location {
  float: center;
}
.tableLocation {
  margin-left: 5%;
  margin-bottom: 3%;
  float: left;
}
.cardContainer {
  padding: 2px 16px;
  padding-bottom: 5%;
}
.print  {
  float: left;
}
@media only screen and (max-width: 991px) {
  .location {
    margin-top: 3%;
    float: center;
  }
  .nameap {
    float: center;
  }
}
</style>
