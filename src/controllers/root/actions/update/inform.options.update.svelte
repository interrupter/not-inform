<script>
    import { Elements } from "not-bulma";
    const { UIButtons } = Elements.Buttons;
    const { UITitle } = Elements.Various;
    import { onMount, createEventDispatcher } from "svelte";
    import UISinkOptions from "./inform.options.sink.svelte";
    import CommonLocal from "../../../../common/index";
    import { writable } from "svelte/store";

    const optionsStore = writable({});

    const dispatch = createEventDispatcher();

    export let options = {};

    export let title = "";
    export let subtitle = "";

    onMount(() => {
        $optionsStore = [];
        if (Array.isArray(options)) {
            options = {
                sinks: options,
            };
        }
        $optionsStore = [...Object.values(options.sinks)];
        $optionsStore.forEach((val) => {
            if (!val._id) {
                val._id = Math.random().toString().slice(3, 10);
            }
        });
        optionsStore.subscribe((val) => {
            let res = {};
            Object.values(val).forEach((sink) => {
                if (Object.hasOwn(res, sink.id)) {
                    sink.id = sink.id + "-" + 1;
                }
                res[sink.id] = sink;
            });
            options.sinks = res;
            options = options;
        });
    });

    function saveToServer() {
        dispatch("submit", options);
    }

    function addSink() {
        $optionsStore.unshift({ ...CommonLocal.getDefaultSink() });
        $optionsStore = $optionsStore;
    }

    function exportToJSON() {
        dispatch("exportToJSON");
    }

    function importFromJSON() {
        dispatch("importFromJSON");
    }

    function removeSink(e) {
        if (e.detail.index > -1) {
            $optionsStore.splice(e.detail.index, 1);
        }
        $optionsStore = $optionsStore;
    }
</script>

<UITitle {title} {subtitle} size={3} />
<div class="columns">
    <div class="column">
        <UIButtons
            centered={true}
            values={[
                {
                    color: "primary",
                    action: addSink,
                    title: "Добавить",
                },
                {
                    action: exportToJSON,
                    title: "Экспорт JSON",
                },
                {
                    action: importFromJSON,
                    title: "Импорт JSON",
                },
            ]}
        />
    </div>
</div>
{#if $optionsStore}
    {#each $optionsStore as sink, index (sink._id)}
        <UISinkOptions {index} bind:value={sink} on:delete={removeSink} />
    {/each}
{/if}

<div class="field is-horizontal">
    <div class="field-label">
        <!-- Left empty for spacing -->
    </div>
    <div class="field-body">
        <div class="field">
            <div class="control">
                <button class="button is-primary" on:click={saveToServer}
                    >Сохранить</button
                >
            </div>
        </div>
    </div>
</div>
