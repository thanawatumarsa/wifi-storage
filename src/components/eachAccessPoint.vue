<template lang="html">
    <tbody>
        <tr v-for="(wifi, index) in wifiInfo[tempIndex].accesspoint">
          <td>
            {{wifi.apName}}
          </td>
          <td>
            {{wifi.serial}}
          </td>
          <td>
            {{wifi.mac}}
          </td>
          <td>
            {{wifi.location}}
          </td>
          <td>
            {{wifi.channel}}
          </td>
          <td>
            <span @click="toDetailAP(wifi, index)" class="glyphicon glyphicon-search" aria-hidden="true" style="cursor:pointer"></span>
          </td>
          <td>
            <span @click="editAp(wifi, index)" class="glyphicon glyphicon-edit" aria-hidden="true" data-toggle="modal" data-target="#basicModal2" style="cursor:pointer; float:left"></span>
            <span @click="remove(wifi, index)" class="glyphicon glyphicon-trash" aria-hidden="true" data-toggle="modal" data-target="#basicModal3" style="cursor:pointer ; float:right"></span>
          </td>

        <div class="modal fade" id="basicModal2" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">Edit access point</h4>
              </div>
              <div class="modal-body">
                <form>
                    <div class="form-group">
                      <div class="" style="float:left">
                        <h4>Name</h4>
                      </div>
                      <input type="text" id="addProject" name="addProject" class="form-control" placeholder="Name" v-model="editaccesspoint.apName">
                    </div>
                    <div class="form-group">
                      <div class="" style="float:left">
                        <h4>Serial Number</h4>
                      </div>
                      <input type="text" id="addProject" name="addProject" class="form-control" placeholder="Serial Number" v-model="editaccesspoint.serial">
                    </div>
                    <div class="form-group">
                      <div class="" style="float:left">
                        <h4>MAC Address</h4>
                      </div>
                      <input type="text" id="addProject" name="addProject" class="form-control" placeholder="MAC Address" v-model="editaccesspoint.mac">
                    </div>
                    <div class="form-group">
                      <div class="" style="float:left">
                        <h4>Location</h4>
                      </div>
                      <input type="text" id="addProject" name="addProject" class="form-control" placeholder="Location" v-model="editaccesspoint.location">
                    </div>
                    <div class="form-group">
                      <div class="" style="float:left">
                        <h4>Channel</h4>
                      </div>
                      <input type="text" id="addProject" name="addProject" class="form-control" placeholder="Location" v-model="editaccesspoint.channel">
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button @click="clickSaveEdit(wifi)" type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
                </div>
              </div>
            </div>
          </div>

          <div class="modal fade" id="basicModal3" tabindex="-1" role="dialog" aria-labelledby="basicModal3" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                  <h4 class="modal-title" id="myModalLabel">Remove access point</h4>
                </div>
                <div class="modal-header">
                  <h3>Are you sure to remove this access point?</h3>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Cancle</button>
                  <button  @click="removeAp(removeindex)" type="button" class="btn btn-primary" data-dismiss="modal">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </tr>
    </tbody>
</template>

<script>
export default {
  props: ['wifiInfo', 'tempIndex', 'removeAp', 'editAp', 'editaccesspoint', 'editApSave', 'apIndex', 'wifidetail', 'apDetail'],
  data () {
    return {
      counts: '',
      removeindex: ''
    }
  },
  methods: {
    toDetailAP: function (wifi, index) {
      var vm = this
      vm.apDetail(wifi, index)
      vm.$router.push('/selectAP')
    },
    clickSaveEdit: function (wifi) {
      this.counts = this.apIndex
      this.editApSave(wifi, this.counts)
    },
    remove: function (wifi, index) {
      this.removeindex = index
    }
  }
}
</script>

<style lang="css">
</style>
