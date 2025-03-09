<template>
    <div class="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-md text-center">
        <!-- <img src="/placeholder.svg" width="200" height="200" alt="Página não encontrada" class="mx-auto" style="aspect-ratio: 200 / 200; object-fit: cover;" /> -->
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Oops, página não encontrada!</h1>
        <p class="mt-4 text-muted-foreground">
          Desculpe, mas a página que você está procurando não existe. Verifique o endereço ou volte para a página inicial.
        </p>
        <div class="mt-6">
          <router-link 
            class="inline-flex text-white items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" 
            to="/">
            Voltar à página inicial
          </router-link>
        </div>
      </div>
    </div>
  </template>