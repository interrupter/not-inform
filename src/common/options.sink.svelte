<script>

  import 'bulma-switch';
  import {onMount, createEventDispatcher } from 'svelte';
  import UIRuleOptions from './options.rule.svelte';
  import CommonLocal from './index.js';
  let dispatch = createEventDispatcher();

  import {
    writable
  } from 'svelte/store';

  const rulesStore = writable({});

  export let readonly = false;
  export let disabled = false;
  export let index = -1;
  export let showContent = false;
  export let value = {
    _id: Math.random().toString().slice(3, 10),
    id:     'some-rule',
    type:   'email',
    account: {
      host: '',
      port: 465,
      secure: true,
      auth: {
        user: '',
        pass: ''
      }
    },
    rules: {

    }
  };

  onMount(()=>{
    if(typeof value.id === 'undefined' || value.id === 'undefined'){
      value.id = 'Sink';
    }
    $rulesStore = [...Object.values(value.rules)];
    $rulesStore.forEach((val)=>{
      if(!val._id){
        val._id = Math.random().toString().slice(3, 10);
      }
    });
    rulesStore.subscribe((val)=>{
      let res = {};
      Object.values(val).forEach(rule => {
        if(Object.prototype.hasOwnProperty.call(res,rule.id)){
          rule.id = rule.id + '-' + 1;
        }
        res[rule.id] = rule;
      });
      value.rules = res;
      value = value;
    });
  });

  function addRule(){
    $rulesStore.unshift({...CommonLocal.getDefaultRule()});
    $rulesStore = $rulesStore;
  }

  function removeRule(e){
    if (e.detail.index > -1){
      $rulesStore.splice(e.detail.index, 1);
      $rulesStore = $rulesStore;
    }
  }

  function deleteThis(e){
    e.preventDefault();
    dispatch('delete', {index, id, value});
    return false;
  }

</script>

<div class="box has-background-light">
  <div class="field is-horizontal">
    <div class="field-label">
      <h4 class="title is-4">{value.id}</h4>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <input type="checkbox" class="switch" id="showContent-edit-sink-options-{value._id}" bind:checked={showContent} name="showContent" />
          <label class="label" for="showContent-edit-sink-options-{value._id}">Показать</label>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-danger" on:click={deleteThis}>Удалить</button>
        </div>
      </div>
    </div>
  </div>
  {#if showContent }
  <div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="edit-sink-options-{value.id}-id">ID</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-narrow">
            <input class="input is-success" type="text" placeholder="название" bind:value={value.id} {readonly} {disabled} />
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="edit-sink-options-{value.id}-type">Тип</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control is-narrow">
            <div class="select" id="edit-sink-options-{value.id}-type">
              <select bind:value={value.type} {readonly} {disabled}>
                <option value="email">Email</option>
                <option value="notification">Notification</option>
                <option value="ws">WebSockets</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    {#if value.type === 'email' }
    <h5 class="title is-5">Аккаунт</h5>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="edit-sink-options-{value.id}-account-host">Сервер</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-narrow">
            <input class="input is-success" id="edit-sink-options-{value.id}-account-host" type="text" placeholder="host" bind:value={value.account.host} {readonly} {disabled} />
          </p>
        </div>
        <div class="field">
          <p class="control is-narrow">
            <input class="input is-success" type="text" placeholder="port" bind:value={value.account.port} {readonly} {disabled} />
          </p>
        </div>
        <div class="field">
          <p class="control is-narrow">
            <input type="checkbox" class="switch" id="edit-sink-options-{value.id}-account-secure" bind:checked={value.account.secure} name="account.secure" {readonly} {disabled} />
            <label class="label" for="edit-sink-options-{value.id}-account-secure">Secure</label>
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="edit-sink-options-{value.id}-account-host">Логин/пароль</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-narrow">
            <input class="input is-success" id="edit-sink-options-{value.id}-account-user" type="text" placeholder="username" bind:value={value.account.auth.user} {readonly} {disabled} />
          </p>
        </div>
        <div class="field">
          <p class="control is-narrow">
            <input class="input is-success" type="password" placeholder="password" bind:value={value.account.auth.pass} {readonly} {disabled} />
          </p>
        </div>
      </div>
    </div>
    {:else if value.type === 'ws'}
    <div class="notification is-warning">Настройки WS отсутствуют.</div>
    {:else if value.type === 'notification'}
    <div class="notification is-warning">Настройки извещений отсутствуют.</div>
    {:else if value.type === 'sms'}
    <div class="notification is-warning">Интерфейс недоступен.</div>
    {/if}

    <h4 class="title is-4">Правила</h4>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="edit-sink-options-{value.id}-account-host">Соотвествие</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control is-narrow">
            <div class="select" id="edit-sink-options-{value.id}-meet">
              <select bind:value={value.meet} {readonly} {disabled}>
                <option value="all">Всем</option>
                <option value="any">Любому</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-primary" on:click={addRule}>Добавить правило</button>
          </div>
        </div>
      </div>
    </div>
    {#if $rulesStore && $rulesStore.length }
    <div class="pl-6">
    {#each $rulesStore as rule, index(rule._id)}
    <UIRuleOptions {index} id={rule._id} bind:value={rule} on:delete={removeRule} />
    {/each}
    </div>
    {/if}
  </div>
  {/if}
</div>
