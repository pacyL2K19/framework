---
title: Login
---

# JLLogin

This component renders a fully functional login form, including SSO buttons if enabled.

:::tip
If you wish to use SSO buttons checkout our [backend setup instructions](/backend/core/modules/auth.md).
:::

## Usage

```vue
<script lang="ts" setup>
import { JLLogin } from '@juicyllama/quasar'

const google = Boolean(import.meta.env.VITE_SSO_GOOGLE)
const facebook = Boolean(import.meta.env.VITE_SSO_FACEBOOK)
const linkedin = Boolean(import.meta.env.VITE_SSO_LINKEDIN)

</script>
<template>
    <JLLogin 
        :google='google' 
        :facebook='facebook' 
        :linkedin='linkedin' 
        :dense="true" 
        :lazy_rules='true' 
        class="q-mt-md"
    > </JLLogin>
</template>
```


## SSO Options

Out of the box, the login form will render the following SSO buttons in the `actions` slot, you can customize this by passing in your own actions. For example:

```vue

<script lang="ts" setup>
import { JLLogin, googleLogin } from '@juicyllama/quasar'
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
</script>

<JLLogin  :dense="true" :lazy_rules='true' class="q-mt-md">
<template #header><div class="auth-before"></div></template>
                <template #actions="{ loading }">
                  <div class="auth-reset-password">
                  <router-link to="/reset">Reset Password</router-link>
                  </div>
                  <div class="auth-button">
                  <q-btn class="button-primary" color="primary" type="submit" :disabled="loading">
                    <span v-if="loading">
                      <q-spinner-dots color="white" size="1em" />
                    </span>
                    <span v-else>LOGIN</span>
                  </q-btn>
                  </div>
                    
                      <div class="auth-button">
                          <q-btn
                              color='white'
                              text-color='black'
                              @click="googleLogin(VITE_API_BASE_URL)"
                              :loading="loading"
                              :disabled="loading"
                              class="q-mr-xs"
                          >
                              <q-avatar size="30px" class='q-mr-sm'>
                                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg">
                              </q-avatar>
                              Login with Google
                          </q-btn>
                      </div>
                </template>
</JLLogin>
```