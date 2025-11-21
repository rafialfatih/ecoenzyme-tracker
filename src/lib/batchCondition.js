export function evaluateBatchCondition(batch, activities, progressDays) {
  if (!batch) return null

  const hasHarvestActivity = activities.some((a) => a.activity_type === 'harvest')
  if (hasHarvestActivity) {
    return {
      status: 'Siap Panen',
      recommendation: 'Batch telah dipanen. Eco enzyme siap digunakan.',
    }
  }

  if (batch.status === 'completed') {
    return {
      status: 'Fermentasi Berhasil',
      recommendation: 'Fermentasi berhasil diselesaikan. Eco enzyme siap digunakan.',
    }
  }

  if (batch.status === 'failed') {
    return {
      status: 'Gagal Fermentasi',
      recommendation: 'Fermentasi gagal. Silakan buat batch baru.',
    }
  }

  const latestConditionActivity = activities.find(
    (a) => a.activity_type === 'check_condition' && a.condition,
  )

  const maggotRemovalInfo = checkRecentMaggotRemoval(activities)

  if (latestConditionActivity && latestConditionActivity.condition) {
    const condition = latestConditionActivity.condition
    const conditionDate = new Date(latestConditionActivity.activity_date)

    let effectiveMaggot = condition.maggot || false
    if (maggotRemovalInfo && maggotRemovalInfo.date > conditionDate) {
      effectiveMaggot = false
    }

    const result = evaluateCondition(condition, progressDays, effectiveMaggot)

    if (
      maggotRemovalInfo &&
      maggotRemovalInfo.date > conditionDate &&
      condition.maggot &&
      !condition.mold &&
      condition.smell !== 'rotten' &&
      result.status === 'Perlu Perhatian'
    ) {
      return {
        status: 'Aman',
        recommendation:
          'Ulat telah dibuang. Kondisi fermentasi kembali normal. Lanjutkan pemantauan rutin dan pastikan wadah tertutup rapat.',
      }
    }

    return result
  }

  if (activities.length > 0) {
    if (maggotRemovalInfo) {
      return {
        status: 'Aman',
        recommendation:
          'Ulat telah dibuang. Kondisi fermentasi kembali normal. Lanjutkan pemantauan rutin dan pastikan wadah tertutup rapat.',
      }
    }

    return {
      status: 'Aman',
      recommendation:
        'Batch aktif. Lakukan pengecekan kondisi secara rutin untuk memantau perkembangan fermentasi.',
    }
  }

  return {
    status: 'Aman',
    recommendation:
      'Batch baru dibuat. Kondisi fermentasi normal. Lakukan pengecekan kondisi secara rutin untuk memantau perkembangan fermentasi.',
  }
}

function checkRecentMaggotRemoval(activities) {
  const removalActivities = activities.filter((a) => a.activity_type === 'remove_maggots')
  if (removalActivities.length > 0) {
    const sorted = removalActivities.sort(
      (a, b) => new Date(b.activity_date) - new Date(a.activity_date),
    )
    return { date: new Date(sorted[0].activity_date) }
  }
  return null
}

function evaluateCondition(condition, days, effectiveMaggot) {
  const color = condition.color || ''
  const smell = condition.smell || ''
  const bubbles = condition.bubbles || false
  const mold = condition.mold || false
  const maggot = effectiveMaggot

  let failureScore = 0
  const failureReasons = []

  if (smell === 'rotten') {
    return {
      status: 'Potensi Gagal',
      recommendation:
        'Aroma busuk adalah salah satu tanda bahwa fermentasi gagal, dengan kemungkinan 99% gagal. Hal ini mungkin disebabkan oleh bahan yang salah atau rasio yang tidak benar. Hal ini paling baik untuk memulai ulang dan tidak melanjutkan proses fermentasi pada batch ini',
    }
  }

  if (mold && maggot) {
    return {
      status: 'Potensi Gagal',
      recommendation:
        'Kondisi fermentasi sangat buruk dengan adanya jamur dan ulat. Ini menunjukkan kontaminasi yang sangat berat dan fermentasi gagal. Hentikan proses ini segera dan buang batch ini. Untuk batch berikutnya, pastikan kebersihan wadah, rasio bahan yang benar, dan tutup rapat untuk mencegah ulat dari bertelur',
    }
  }

  if (mold) {
    failureScore += 3
    failureReasons.push('jamur')
  }

  if (maggot) {
    failureScore += 2
    failureReasons.push('ulat')
  }

  if ((color === 'dark_brown' || color === 'cloudy') && (!smell || smell === '')) {
    failureScore += 2
    failureReasons.push('warna gelap tanpa aroma')
  }

  let positiveScore = 0
  const positiveIndicators = []

  if (bubbles) {
    positiveScore += 2
    positiveIndicators.push('gelembung')
  }

  if (smell === 'fermented' || smell === 'citrus') {
    positiveScore += 1
    positiveIndicators.push('aroma fermentasi')
  }

  if (color === 'amber' || color === 'light_brown') {
    positiveScore += 1
    positiveIndicators.push('warna baik')
  }

  let attentionScore = 0
  const attentionReasons = []

  if ((color === 'dark_brown' || color === 'cloudy') && !bubbles && days >= 21) {
    attentionScore += 2
    attentionReasons.push('warna gelap tanpa gelembung')
  }

  if (!bubbles && !smell && days >= 7 && days <= 21) {
    attentionScore += 2
    attentionReasons.push('tidak ada aktivitas fermentasi')
  }

  if (color === 'cloudy' && bubbles) {
    attentionScore += 1
    attentionReasons.push('warna keruh dengan gelembung berlebih')
  }

  if (smell === 'fermented' && bubbles && days <= 21) {
    attentionScore += 1
    attentionReasons.push('fermentasi sangat aktif')
  }

  if (failureScore >= 3) {
    if (mold) {
      return {
        status: 'Potensi Gagal',
        recommendation:
          'Jamur ditemukan pada permukaan fermentasi menunjukkan kontaminasi yang dapat menyebabkan fermentasi gagal. Jamur biasanya muncul karena kandungan gula yang tidak cukup atau terlalu banyak udara masuk. Batch ini harus dihentikan dan batch baru dibuat, memastikan rasio 3:1:10 yang lebih akurat dan wadah tertutup rapat',
      }
    }

    return {
      status: 'Potensi Gagal',
      recommendation:
        'Beberapa indikator kegagalan terdeteksi. Perlu evaluasi lebih lanjut dan pertimbangan untuk menghentikan batch ini.',
    }
  }

  if (maggot && !mold && smell !== 'rotten') {
    return {
      status: 'Perlu Perhatian',
      recommendation:
        'Kondisi fermentasi masih relatif aman, tapi silakan buang ulat terlebih dahulu lalu tutup wadah kembali',
    }
  }

  if (
    (color === 'amber' || color === 'light_brown') &&
    (smell === 'fermented' || smell === 'citrus') &&
    bubbles &&
    days >= 60
  ) {
    return {
      status: 'Siap Panen',
      recommendation:
        'Kondisi fermentasi sangat baik! Warna kuning emas, aroma asam segar, dan banyak gelembung menunjukkan fermentasi sempurna. Jika sudah mencapai hari 90 atau lebih, fermentasi siap untuk dipanen dan digunakan',
    }
  }

  if (days >= 90 && failureScore === 0 && smell !== 'rotten') {
    return {
      status: 'Siap Panen',
      recommendation:
        'Selamat! Batch ini telah melewati periode fermentasi 90 hari tanpa tanda gagal. Batch ini siap untuk dipanen, disaring, dan digunakan. Sisa bahan dapat digunakan sebagai pupuk kompos',
    }
  }

  if (attentionScore >= 2) {
    if ((color === 'dark_brown' || color === 'cloudy') && !bubbles && days >= 21) {
      return {
        status: 'Perlu Perhatian',
        recommendation:
          'Warna fermentasi terlalu gelap dan tidak ada aktivitas gelembung. Hal ini mungkin menunjukkan fermentasi yang lambat atau bahan organik yang terlalu matang. Lanjutkan fermentasi sampai hari 90 sambil memantau. Jika tidak ada perubahan hingga hari 60, pertimbangkan untuk menambahkan sedikit gula merah',
      }
    }

    if (!bubbles && !smell && days >= 7 && days <= 21) {
      return {
        status: 'Perlu Perhatian',
        recommendation:
          'Tidak ada aktivitas fermentasi yang signifikan yang terlihat. Pastikan rasio bahan yang benar (3:1:10). Coba menggoyangkan wadah secara perlahan untuk memdistribusikan bahan secara merata dan memastikan wadah tertutup rapat tetapi tidak sepenuhnya tertutup udara. Tunggu 1-2 minggu sambil memantau',
      }
    }

    if (color === 'cloudy' && bubbles) {
      return {
        status: 'Perlu Perhatian',
        recommendation:
          'Warna putih kecoklatan dan gelembung berlebih menunjukkan kemungkinan terlalu banyak ragi atau fermentasi yang terlalu cepat. Buka tutup untuk melepaskan gas, aduk secara perlahan, lalu tutup kembali. Hindari menggoyangkan wadah terlalu keras. Pantau untuk minggu berikutnya',
      }
    }

    if (smell === 'fermented' && bubbles && days <= 21) {
      return {
        status: 'Perlu Perhatian',
        recommendation:
          'Aroma seperti alkohol yang kuat menunjukkan fermentasi yang sangat aktif. Buka tutup secara rutin setiap hari selama minggu pertama untuk melepaskan gas berlebih. Hal ini normal pada fase awal tapi perlu diperhatikan untuk mencegah fermentasi berlebih',
      }
    }
  }

  if (
    (color === 'light_brown' || color === 'dark_brown') &&
    (smell === 'fermented' || smell === 'sweet') &&
    bubbles &&
    days >= 30 &&
    days <= 60
  ) {
    return {
      status: 'Aman',
      recommendation:
        'Proses fermentasi berjalan dengan baik. Warna dan aroma normal untuk fase ini. Lanjutkan pemantauan rutin dan jangan lupa untuk membuka tutup setiap 3 hari selama 21 hari pertama untuk melepaskan gas',
    }
  }

  if (bubbles && (smell === 'fermented' || smell === 'citrus')) {
    return {
      status: 'Aman',
      recommendation: null,
    }
  }

  return {
    status: 'Aman',
    recommendation: 'Kondisi fermentasi normal. Lanjutkan pemantauan rutin.',
  }
}
