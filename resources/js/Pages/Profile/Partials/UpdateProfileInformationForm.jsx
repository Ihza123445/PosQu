import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;
    const [fotoPreview, setFotoPreview] = useState(null);

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            foto: null,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('foto', file);
            setFotoPreview(URL.createObjectURL(file));
        }
    };

    const fotoUrl = fotoPreview || user.foto || null;

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-[#000000]">
                    Profile Information
                </h2>
                <p className="mt-1 text-sm text-[#52525b]">
                    Update your account's profile information and photo.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Foto Profile */}
                <div className="flex items-center gap-6">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#f4f4f5]">
                        {fotoUrl ? (
                            <img src={fotoUrl} alt={data.name} className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-heading-md font-[500] text-[#52525b]">{data.name?.charAt(0)}</span>
                        )}
                    </div>
                    <div>
                        <label className="cursor-pointer btn-outline text-sm !px-4 !py-2">
                            <input type="file" accept="image/*" className="hidden" onChange={handleFotoChange} />
                            Ganti Foto
                        </label>
                        <p className="mt-1 text-micro text-[#a1a1aa]">JPG, PNG atau WebP. Maks 2MB.</p>
                        {errors.foto && <p className="mt-1 text-xs text-red-500">{errors.foto}</p>}
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Nama" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-[#000000]">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-[#52525b] underline hover:text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#000000] focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Simpan</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-[#52525b]">Tersimpan.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
