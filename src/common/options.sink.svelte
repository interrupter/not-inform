<script>

  import 'bulma-switch';
  import {onMount, createEventDispatcher } from 'svelte';
  import UIRuleOptions from './options.rule.svelte';
  import CommonLocal from './index.js';
  let dispatch = createEventDispatcher();

  export let readonly = false;
  export let disabled = false;
  export let index = -1;
  export let showContent = false;
  export let value = {
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

  let rules = [];

  onMount(()=>{
    if(typeof value.id === 'undefined'){
      value.id = 'Sink';
    }
    rules = [];
    if (value.rules){
      Object.keys(value.rules).forEach((key)=>{
        rules.push(
        {
          id:     key,
          value:  value.rules[key]
        }
        );
      });
    }
  });

  function refreshOptions(){
    value.rules = {};
    rules.forEach((rule) => {
      value.rules[rule.id] = rule.value;
    });
  }

  function addRule(){
    rules.unshift({
      id: 'rule-' + rules.length,
      value: CommonLocal.getDefaultRule()
    });
    rules = rules;
    refreshOptions();
  }

  function removeRule(e){
    if (e.detail.index > -1){
      rules.splice(e.detail.index, 1);
      rules = rules;
      refreshOptions();
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
          <input type="checkbox" class="switch" id="showContent-edit-sink-options-{value.id}" bind:checked={showContent} name="showContent" />
          <label class="label" for="showContent-edit-sink-options-{value.id}">Показать</label>
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
                <!--<option value="sms">SMS</option>-->
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
    {#if rules && rules.length }
    <div class="pl-6">
    {#each rules as rule, index}
    <UIRuleOptions {index} id={rule.id} value={rule.value} on:delete={removeRule} />
    {/each}
    </div>
    {/if}
  </div>
  {/if}
</div>
