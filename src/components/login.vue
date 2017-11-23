<template lang="html">
    <div class="loginPosition">
        <div class="col-md-6 col-md-offset-3">
          <div class="loginContent">
            <div class="cardlogContainer">
              <form>
                  <div class="page-header">
                    <h1>Sign-in</h1>
                  </div>
                  <div class="form-group">
                    <input type="text" id="email" name="email" class="form-control" placeholder="Email" v-model="dataLogin.email">
                  </div>
                  <div class="form-group">
                    <input type="password" id="password" name="password" class="form-control" placeholder="Password" v-model="dataLogin.pass">
                  </div>
                  <input @click="checkSignIn(dataLogin.email, dataLogin.pass)" type="button" class="btn btn-primary btn-default btn-block" id="submit-login" name="submit-login" value="Login">
                  <div class="left">
                    <a @click="changePage('/register')" style="cursor:pointer">Don't have an account?</a>
                  </div>
              </form>
              <br>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['dataLogin', 'signin', 'changePage', 'wifiInfo', 'checkSignIn'],
  data () {
    return {
    }
  }
}
</script>

<style lang="css">
.radius {
  box-shadow: 3px 3px 4px 4px rgba(0,0,0,0.2);
  border-radius:5px;
  transition: 0.3s;
}
</style>
