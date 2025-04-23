export const handleNumericInput = (
  event: React.ChangeEvent<HTMLInputElement>,
  callback: (error: string) => void
) => {
  const value = event.target.value;
  const numericValue = value.replace(/[^0-9]/g, ""); // Hapus semua karakter non-angka

  if (value !== numericValue) {
    callback("Input must be numeric only!"); // Panggil callback jika ada karakter non-angka
  } else {
    callback(""); // Kosongkan pesan kesalahan jika input valid
  }

  event.target.value = numericValue; // Perbarui nilai input dengan angka saja
};
