@extends('layouts.app')

@section('title', 'Nicky Tirta Putra Nugroho | Portofolio Pengenalan Diri & Keahlian')

@section('content')
  {{-- Hero Section: Profil Utama, Role & Tombol LinkedIn --}}
  @include('components.hero')

  {{-- Pengenalan Diri Mendalam (About Me) --}}
  @include('components.about')

  {{-- Matriks Keahlian & Skill LinkedIn --}}
  @include('components.skills')

  {{-- Terhubung di LinkedIn & Kontak Langsung --}}
  @include('components.connect')
@endsection
