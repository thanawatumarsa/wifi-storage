<template lang="html">
  <tbody>
      <tr v-for="(wifi, index) in wifidetail.testLocation">
        <td>
          {{wifi.location}}
        </td>
        <td>
          {{wifi.dbm}}
        </td>
        <td>
          <span @click="editTestLo(wifi, index)" class="glyphicon glyphicon-edit" aria-hidden="true" data-toggle="modal" data-target="#edittest" style="cursor:pointer"></span>
          <span @click="remove(wifi, index)" class="glyphicon glyphicon-trash" aria-hidden="true" data-toggle="modal" data-target="#remove" style="cursor:pointer"></span>
        </td>
        <div class="modal fade" id="remove" tabindex="-1" role="dialog" aria-labelledby="basicModal3" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">Remove Location</h4>
              </div>
              <div class="modal-header">
                <h3>Are you sure to remove this Location?</h3>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancle</button>
                <button  @click="removeTestLocation(removeindex)" type="button" class="btn btn-primary" data-dismiss="modal">Remove</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="edittest" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">Edit Test Location</h4>
              </div>
              <div class="modal-body">
                <form>
                    <div class="form-group">
                      <div class="" style="float:left">
                        <h4>Location</h4>
                      </div>
                      <input type="text" id="addProject" name="addProject" class="form-control" placeholder="Location" v-model="editTestLocation.location">
                    </div>
                    <div class="form-group">
                      <div class="" style="float:left">
                        <h4>dBm</h4>
                      </div>
                      <input type="text" id="addProject" name="addProject" class="form-control" placeholder="dBm" v-model="editTestLocation.dbm">
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button @click="clickSaveEditLo(wifi)" type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
                </div>
              </div>
            </div>
          </div>
      </tr>
  </tbody>
</template>

<script>
export default {
  props: ['wifidetail', 'locationindex', 'removeTestLocation', 'editTestLocation', 'editTestLo', 'testlocationindex', 'editLoSave', 'print'],
  data () {
    return {
      removeindex: '',
      countIndex: ''
    }
  },
  methods: {
    remove: function (wifi, index) {
      this.removeindex = index
    },
    clickSaveEditLo: function (wifi) {
      this.countIndex = this.testlocationindex
      this.editLoSave(wifi, this.countIndex)
    }
  }
}
</script>

<style lang="css">
</style>
