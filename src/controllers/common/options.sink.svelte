<script>

  import 'bulma-switch';
  import {onMount, createEventDispatcher } from 'svelte';
  import UIRuleOptions from './options.rule.svelte';
  import CommonLocal from './index.js';
  let dispatch = createEventDispatcher();

  export let readonly = false;
  export let disabled = false;
  export let index = -1;
  export let id = 'some-rule';
  export let value = {
    type: 'email',
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
    sinks.unshift({
      id: 'rule-' + sinks.length,
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

<div>
  <h4 class="title is-4">Назначение: {id} <a href class="delete" on:click={deleteThis}></a></h4>
  <div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="edit-sink-options-{id}-id">ID</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded">
            <input class="input is-success" type="text" placeholder="название" bind:value={id} {readonly} {disabled} />
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="edit-sink-options-{id}-type">Тип</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control is-expanded">
            <div class="select" id="edit-sink-options-{id}-type">
              <select bind:value={value.type} {readonly} {disabled}>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
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
        <label class="label" for="edit-sink-options-{id}-account-host">Сервер</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-small">
            <input class="input is-success" id="edit-sink-options-{id}-account-host" type="text" placeholder="host" bind:value={value.account.host} {readonly} {disabled} />
          </p>
        </div>
      </div>
      <div class="field">
        <div class="field">
          <p class="control is-small">
            <input class="input is-success" type="text" placeholder="port" bind:value={value.account.port} {readonly} {disabled} />
          </p>
        </div>
      </div>
      <div class="field">
        <div class="field">
          <p class="control is-small">
            <input type="checkbox" class="switch" id="edit-sink-options-{id}-account-secure" bind:checked={value.account.secure} name="account.secure" {readonly} {disabled} />
            <label class="label" for="edit-sink-options-{id}-account-secure">Secure</label>
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" for="edit-sink-options-{id}-account-host">Логин/пароль</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-small">
            <input class="input is-success" id="edit-sink-options-{id}-account-user" type="text" placeholder="username" bind:value={value.account.auth.user} {readonly} {disabled} />
          </p>
        </div>
        <div class="field">
          <div class="field">
            <p class="control is-small">
              <input class="input is-success" type="password" placeholder="password" bind:value={value.account.auth.pass} {readonly} {disabled} />
            </p>
          </div>
        </div>
      </div>
    </div>
    {:else if value.type === 'sms'}
    <div class="notification is-warning">Интерфейс недоступен.</div>
    {/if}

    <h4 class="title is-4">Правила</h4>
    <div class="field is-horizontal">
      <div class="field-label">
        <!-- Left empty for spacing -->
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <button class="button is-primary" on:click={addRule}>Добавить правило</button>
          </div>
        </div>
      </div>
    </div>
    {#if rules && rules.length }
    {#each rules as rule, index}
    <UIRuleOptions {index} id={rule.id} value={rule.value} on:delete={removeRule} />
    {/each}
    {/if}
  </div>
</div>
