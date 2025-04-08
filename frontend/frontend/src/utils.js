export const pageNumbersGenerate = (totalPages) =>
{
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers
}

// export default pageNumbersGenerate