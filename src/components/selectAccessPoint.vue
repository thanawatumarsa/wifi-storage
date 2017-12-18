<template lang="html">
  <div class="col-md-12" style="margin-top:3%">
    <div class="col-xs-12 col-md-4">
      <div class="nameap">
        <div class="cardContainer">
          <div class="col-xs-12 col-md-12">
            <div class="no-print" style="float:left; margin-top:1%;  margin-bottom:1%">
            <a @click="changePage('/dashboard')" style="cursor:pointer">Project</a> / <a @click="changePage('/aplists')" style="cursor:pointer">{{wifiInfo[tempIndex].projectName}}</a> / {{wifidetail.apName}}
            </div>
          </div><hr class="no-print">
          <h4 style="text-align:center">Access Point name</h4>
          <h3 style="text-align:center">{{wifidetail.apName}}</h3><hr>
          <h4 style="text-align:center" >S/N : {{wifidetail.serial}}</h4>
          <h4 style="text-align:center">MAC : {{wifidetail.mac}}</h4>
          <h4 style="text-align:center">Location : {{wifidetail.location}}</h4>
          <h4 style="text-align:center">Channel : {{wifidetail.channel}}</h4>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-8 tablecard" style="margin-top:1.5%">
        <div class="location">
          <h3><center>Signal test information.</center></h3><br>
          <button data-toggle="modal" data-target="#addLocation" type="button" class="no-print btn btn-primary" data-dismiss="modal" >New location</button>
          <hr>
        </div>
        <div v-if="wifidetail.testLocation" class="">
          <div class="col-xs-8 col-md-8" style="margin-left:-2%">
            <div class="no-print print">
              <a type="button" @click="myprint()" style="cursor:pointer ">
                Print report
              </a>
            </div>
          </div>
          <div class="no-print col-xs-12 col-md-12" style="margin-bottom:3%">
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
          <div v-else class="col-xs-12 col-md-12" style="margin-bottom:4.53%">
            <h3>No information.</h3>
          </div>
    </div>
    <div class="modal fade" id="addLocation" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
      <div class="col-md-12 col-xs-12">
        <div class="modal-dialog">
          <div class="modal-content" style="overflow:hidden">
            <div class="modal-header" style="background-color:#4DAEE7; color: white">
              <button @click="cleardropdown()" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title" id="myModalLabel">Add Location</h4>
            </div>
            <div class="modal-body">
              <form>
                <div class="row">
                  <div class="col-md-12">
                    <h4>Location</h4>
                    <div class="input-group">
                      <div class="input-group-btn">
                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Locations <span class="caret"></span></button>
                        <ul class="dropdown-menu">
                          <li><a @click="dropdownData('Toilet')">Toilet</a></li>
                          <li><a @click="dropdownData('Bed')">Bed</a></li>
                          <li><a @click="dropdownData('Bacony')">Bacony</a></li>
                          <li><a @click="dropdownData('Entrance')">Entrance</a></li>
                        </ul>
                      </div><!-- /btn-group -->
                      <input type="text" class="form-control" aria-label="..." v-model="newTestLocation.location">
                    </div><!-- /input-group -->
                    <br>
                    <h4>dbm</h4>
                    <div class="from-group">
                      <div class="col-md-12 col-xs-12">
                        <input type="range" min="30" max="100" v-model="newTestLocation.dbm"><br>
                      </div>
                    </div>
                  <div class="input-group">
                    <span class="input-group-addon" id="basic-addon1">-</span>
                    <input type="number" maxlength="3" id="addProject" name="addProject" class="form-control" placeholder="dBm" v-model="newTestLocation.dbm">
                  </div>
                </div><!-- /.col-lg-6 -->
              </div><!-- /.row -->
              </form>
            </div>
            <div class="modal-footer">
              <button @click="cleardropdown()" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button @click="addTestLocation(wifidetail)" type="button" class="btn btn-primary" data-dismiss="modal" :disabled="newTestLocation.location == ''">+ Add</button>
            </div>
          </div>
        </div>
      </div>
  </div>
  </div>

</template>

<script>
import eachTestLocation from '@/components/eachTestLocation'

export default {
  props: ['wifiInfo', 'tempIndex', 'wifidetail', 'addTestLocation', 'newTestLocation', 'locationindex', 'removeTestLocation', 'editTestLocation', 'editTestLo', 'testlocationindex', 'editLoSave', 'print'],
  components: {
    eachTestLocation
  },
  methods: {
    myprint: function () {
      window.print()
    },
    changePage: function (text) {
      var vm = this
      vm.$router.push(text)
    },
    dropdownData: function (lo) {
      this.newTestLocation.location = lo
    },
    cleardropdown: function () {
      this.newTestLocation.location = ''
    }
  }
}
</script>

<style lang="css">
.tablecontrainer {
  margin-top: 5%;
}
.nameap {
  border: 1px solid #a6a6a6;
  border-radius: 5px;
  transition: 0.3s;
  margin-top: 5%;
  background-color: white;
}
.tablecard {
  border: 1px solid #a6a6a6;
  border-radius: 5px;
  transition: 0.3s;
  margin-top: 5%;
  float: center;
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
  padding-bottom: 1.5%;
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
    margin-right: -2.2%;
    margin-left: -2.2%;
  }
}
</style>
