<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3x1 font-bold text-gray-900">
                    {{ model.id ? model.title : "Create a Survery" }}
                </h1>
            </div>
        </template>
        <pre>
            {{ model }}
        </pre>
        <form @submit.prevent="saveSurvery">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Image
                        </label>
                        <div class="mt-1 flex items-center">
                            <img
                                :src="model.image"
                                :alt="model.image"
                               v-if="model.image"
                                calss="w-64 h-48 object-cover"
                            />
                            <span
                                v-else
                                class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="h-[80%] w-[80%] text-gray-300"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                    />
                                </svg>
                                
                            </span>
                            <button
                                type="button"
                                class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <input
                                    type="file"
                                    class="
                                        absolute
                                        left-0
                                        top-0
                                        right-0
                                        bottom-0
                                        opacity-0
                                        cursor-pointer
                                    "
                                />
                                Change
                            </button>
                        </div>

                        <div>
                            <label for="title" class="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input 
                                type="text"
                                name="title"
                                id="title"
                                v-model="model.title"
                                autocomplete="survey_title"
                                class="
                                    mt-1
                                    focus:ring-indigo-500 focus:border-indigo-500
                                    block
                                    w-full
                                    shadow-sm  
                                    sm:text-sm
                                    border-gray-300
                                    rounded-md
                                "
                            />
                        </div>

                        <div>
                            <label for="description" class="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea 
                                name="description"
                                id="description"
                                v-model="model.description"
                                rows="3"
                                autocomplete="survery_description"
                                placeholder="Describe your survey"
                                class="
                                    mt-1
                                    focus:ring-indigo-500 focus:border-indigo-500
                                    block
                                    w-full
                                    shadow-sm  
                                    sm:text-sm
                                    border-gray-300
                                    rounded-md
                                "
                            />
                        </div>

                        <div>
                            <label for="expire_date" class="block text-sm font-medium text-gray-700">
                                Expire Date
                            </label>
                            <input 
                                type="date"
                                name="expire_date"
                                id="expire_date"
                                v-model="model.expire_date"
                                class="
                                    mt-1
                                    focus:ring-indigo-500 focus:border-indigo-500
                                    block
                                    w-full
                                    shadow-sm  
                                    sm:text-sm
                                    border-gray-300
                                    rounded-md
                                "
                            />
                        </div>
                        <div class="flex items-start mt-2">   
                            <div class="flex items-center h-5">
                                <input 
                                    type="checkbox"
                                    name="status"
                                    id="status"
                                    v-model="model.status"
                                    class="
                                        focus:ring-indigo-500
                                        h-4
                                        w-4
                                        text-indigo-600
                                        border-gray-300
                                        rounded
                                    "
                                />
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="status" class="font-medium text-gray-700">
                                    Active
                                </label>
                            </div>
                        </div>

                        <div class="px-4 py-5 bg-white space-y6 sm:p-6">
                    <h3 class="text-2x1 font-semibold flex items-center justify-between">
                        Questions  

                        <button
                            type="button"
                            @click="addQuestion()"
                            class="
                                flex
                                items-center
                                text-sm
                                py-1
                                px-4  
                                rounded-sm
                                text-white
                                bg-gray-600
                                hover:bg-gray-700
                            "
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

                            Add Question
                        </button>
                    </h3>

                    <div v-if="!model.questions.length" class="text-center text-gray-600">
                        You don't have any questions created 
                    </div>
                </div>

                        <div class="px-4 py-3  text-right sm:px-6">
                            <button
                                type="submit"
                                class="
                                    inline-flex
                                    justify-center
                                    py-2
                                    px-4
                                    border border-transparent
                                    shadow-sm
                                    text-sm
                                    font-medium
                                    rounded-md
                                    text-white
                                    bg-indigo-600
                                    hover:bg-indigo-700
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-offset-2
                                    focus:ring-indigo-500
                                "
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </PageComponent>
</template>

<script setup>
import store from "../store";
import { ref } from "vue";
import { useRoute } from "vue-router";

import PageComponent from "../components/PageComponent.vue";

const route = useRoute();

let model = ref({
    title: "",
    status: false,
    description: null,
    image: null,
    expire_date: null,
    questions: [],
});

if (route.params.id) {
    model.value = store.state.surverys.find(
        (s) => (s.id = parseInt(route.params.id))
    );
}
</script>
